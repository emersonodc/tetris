import Foundation
import Capacitor
import GoogleMobileAds

@objc(AppOpenAdPlugin)
public class AppOpenAdPlugin: CAPPlugin, CAPBridgedPlugin, FullScreenContentDelegate {
    public let identifier = "AppOpenAdPlugin"
    public let jsName = "AppOpenAd"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "initialize", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showStartAd", returnType: CAPPluginReturnPromise)
    ]

    private let adUnitID = "ca-app-pub-6541705647323354/5322489375"
    private let testDeviceIdentifiers = ["87298d42a1c642a6ce0892f9f11272d4"]
    private var appOpenAd: AppOpenAd?
    private var loadTime: Date?
    private var isLoadingAd = false
    private var isShowingAd = false
    private var shouldShowAfterLoad = false
    private var sdkStarted = false

    @objc func initialize(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            NSLog("[AppOpenAd] initialize")
            self.startSDKIfNeeded()
            self.loadAdIfNeeded()
            NSLog("[AppOpenAd] initialize:done")
            call.resolve()
        }
    }

    @objc func showStartAd(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            NSLog("[AppOpenAd] showStartAd")
            self.startSDKIfNeeded()
            self.shouldShowAfterLoad = true
            self.presentAdIfPossible()
            self.loadAdIfNeeded()
            NSLog("[AppOpenAd] showStartAd:requested")
            call.resolve()
        }
    }

    private func startSDKIfNeeded() {
        guard !sdkStarted else { return }
        sdkStarted = true
        NSLog("[AppOpenAd] sdk:start")
        MobileAds.shared.requestConfiguration.testDeviceIdentifiers = testDeviceIdentifiers
        NSLog("[AppOpenAd] sdk:testDevices %@", testDeviceIdentifiers.joined(separator: ","))
        MobileAds.shared.start(completionHandler: nil)
    }

    private func isAdFresh() -> Bool {
        guard let loadTime else { return false }
        return Date().timeIntervalSince(loadTime) < 4 * 60 * 60
    }

    private func loadAdIfNeeded() {
        guard !isLoadingAd else { return }
        guard appOpenAd == nil || !isAdFresh() else { return }

        isLoadingAd = true
        NSLog("[AppOpenAd] load:start")

        AppOpenAd.load(with: adUnitID, request: Request()) { [weak self] ad, error in
            guard let self else { return }

            self.isLoadingAd = false

            if let error {
                self.appOpenAd = nil
                self.loadTime = nil
                self.shouldShowAfterLoad = false
                NSLog("[AppOpenAd] load:failed %@", error.localizedDescription)
                self.notifyListeners("startAdFailedToLoad", data: [
                    "message": error.localizedDescription
                ])
                return
            }

            self.appOpenAd = ad
            self.appOpenAd?.fullScreenContentDelegate = self
            self.loadTime = Date()
            NSLog("[AppOpenAd] load:success")
            self.notifyListeners("startAdLoaded", data: [:])

            if self.shouldShowAfterLoad {
                self.presentAdIfPossible()
            }
        }
    }

    private func presentAdIfPossible() {
        guard !isShowingAd else { return }
        guard shouldShowAfterLoad else { return }

        if appOpenAd == nil || !isAdFresh() {
            NSLog("[AppOpenAd] present:waitingForLoad")
            loadAdIfNeeded()
            return
        }

        guard let rootViewController = bridge?.viewController, let appOpenAd else {
            shouldShowAfterLoad = false
            NSLog("[AppOpenAd] present:failed Root view controller not available")
            notifyListeners("startAdFailedToShow", data: [
                "message": "Root view controller not available."
            ])
            return
        }

        isShowingAd = true
        shouldShowAfterLoad = false
        NSLog("[AppOpenAd] present:showing")
        appOpenAd.present(from: rootViewController)
    }

    public func adWillPresentFullScreenContent(_ ad: FullScreenPresentingAd) {
        NSLog("[AppOpenAd] present:didPresent")
        notifyListeners("startAdPresented", data: [:])
    }

    public func adDidDismissFullScreenContent(_ ad: FullScreenPresentingAd) {
        isShowingAd = false
        appOpenAd = nil
        loadTime = nil
        NSLog("[AppOpenAd] present:dismissed")
        notifyListeners("startAdDismissed", data: [:])
        loadAdIfNeeded()
    }

    public func ad(_ ad: FullScreenPresentingAd, didFailToPresentFullScreenContentWithError error: Error) {
        isShowingAd = false
        appOpenAd = nil
        loadTime = nil
        NSLog("[AppOpenAd] present:failed %@", error.localizedDescription)
        notifyListeners("startAdFailedToShow", data: [
            "message": error.localizedDescription
        ])
        loadAdIfNeeded()
    }
}
