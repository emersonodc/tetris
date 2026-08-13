import { Link } from "react-router-dom";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 px-6 py-10">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/"
          className="mb-8 inline-block text-cyan-400 hover:text-cyan-300"
        >
          ← Voltar para o Tretix Neon
        </Link>

        <article className="space-y-8">
          <header>
            <h1 className="text-3xl font-bold text-cyan-400">
              Política de Privacidade — Tretix Neon
            </h1>

            <p className="mt-3 text-sm text-slate-400">
              Última atualização: 13 de agosto de 2026
            </p>
          </header>

          <section>
            <p>
              Esta Política de Privacidade explica como o aplicativo
              <strong> Tretix Neon</strong> ("aplicativo"), desenvolvido e
              disponibilizado pela <strong>EOC Tech</strong> ("Desenvolvedor"),
              trata informações relacionadas aos usuários.
            </p>

            <p className="mt-4">
              Ao utilizar o Tretix Neon, você declara estar ciente das práticas
              descritas nesta Política de Privacidade.
            </p>
          </section>

          <section>
            <h2>1. Sobre o Tretix Neon</h2>

            <p>
              O Tretix Neon é um jogo de quebra-cabeça inspirado no estilo
              clássico de jogos de blocos, desenvolvido pela EOC Tech e
              disponibilizado para dispositivos móveis.
            </p>

            <p>
              O aplicativo não exige a criação de uma conta de usuário e não
              solicita diretamente informações como nome, endereço, telefone
              ou senha para utilização de suas funcionalidades principais.
            </p>
          </section>

          <section>
            <h2>2. Informações armazenadas pelo aplicativo</h2>

            <p>
              O Tretix Neon armazena localmente no dispositivo do usuário a
              maior pontuação obtida no jogo.
            </p>

            <p>
              Essa informação é utilizada exclusivamente para permitir que o
              aplicativo mantenha e exiba o recorde do jogador.
            </p>

            <p>
              O recorde é armazenado localmente no dispositivo por meio do
              armazenamento local do aplicativo e não é enviado pelo Tretix
              Neon para um servidor próprio.
            </p>

            <p>
              A EOC Tech não mantém um banco de dados próprio contendo os
              recordes dos usuários.
            </p>
          </section>

          <section>
            <h2>3. Publicidade e Google AdMob</h2>

            <p>
              O Tretix Neon utiliza o serviço <strong>Google AdMob</strong>,
              fornecido pela Google, para exibir anúncios dentro do aplicativo.
            </p>

            <p>
              O Google Mobile Ads SDK utilizado pelo aplicativo pode coletar e
              compartilhar determinadas informações automaticamente, incluindo,
              conforme aplicável:
            </p>

            <ul>
              <li>endereço IP;</li>
              <li>
                interações do usuário com o aplicativo, como inicialização do
                aplicativo, toques e interações com anúncios;
              </li>
              <li>informações de diagnóstico e desempenho;</li>
              <li>
                identificadores de dispositivo e conta, incluindo o
                identificador de publicidade do Android e o App Set ID;
              </li>
              <li>
                informações necessárias para exibição, medição, segurança e
                prevenção de fraude relacionadas aos anúncios.
              </li>
            </ul>

            <p>
              Essas informações podem ser utilizadas pela Google para
              finalidades relacionadas a publicidade, análise, medição de
              desempenho e prevenção de fraude.
            </p>

            <p>
              Os dados coletados pelo Google Mobile Ads SDK são criptografados
              durante a transmissão, de acordo com as informações técnicas
              fornecidas pela Google.
            </p>

            <p>
              O tratamento realizado pela Google está sujeito às próprias
              políticas e termos da Google.
            </p>

            <p>
              <strong>Como a Google usa dados:</strong>{" "}
              <a
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                policies.google.com/technologies/partner-sites
              </a>
            </p>

            <p>
              <strong>Política de Privacidade da Google:</strong>{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:underline"
              >
                policies.google.com/privacy
              </a>
            </p>
          </section>

          <section>
            <h2>4. Publicidade personalizada e preferências</h2>

            <p>
              Dependendo da região, das configurações do dispositivo, das
              configurações de publicidade e dos mecanismos de consentimento
              aplicáveis, os anúncios exibidos pelo Google AdMob podem ser
              personalizados ou não personalizados.
            </p>

            <p>
              Os usuários podem gerenciar determinadas preferências relacionadas
              à publicidade por meio das configurações do próprio dispositivo e
              das ferramentas disponibilizadas pela Google.
            </p>

            <p>
              Usuários localizados no Espaço Econômico Europeu, Reino Unido ou
              Suíça podem estar sujeitos a requisitos específicos de
              consentimento para publicidade personalizada.
            </p>
          </section>

          <section>
            <h2>5. Serviços de terceiros</h2>

            <p>
              O Tretix Neon utiliza serviços de terceiros necessários para
              determinadas funcionalidades, principalmente o Google AdMob para
              publicidade.
            </p>

            <p>
              Esses terceiros podem tratar informações de acordo com suas
              próprias políticas de privacidade e termos de serviço.
            </p>

            <p>
              A EOC Tech não controla integralmente as práticas de privacidade
              de serviços de terceiros e recomenda que os usuários consultem
              suas respectivas políticas.
            </p>
          </section>

          <section>
            <h2>6. Informações que não solicitamos diretamente</h2>

            <p>
              O Tretix Neon não solicita diretamente, para criação de conta ou
              utilização normal do jogo:
            </p>

            <ul>
              <li>nome completo;</li>
              <li>endereço residencial;</li>
              <li>número de telefone;</li>
              <li>senha;</li>
              <li>dados de cartão de crédito;</li>
              <li>documentos de identificação;</li>
              <li>contatos do dispositivo;</li>
              <li>localização precisa do usuário.</li>
            </ul>

            <p>
              O aplicativo também não possui, em sua funcionalidade principal,
              um sistema próprio de cadastro de usuários.
            </p>

            <p>
              Isso não impede que serviços de terceiros integrados ao
              aplicativo, como o Google AdMob, tratem determinadas informações
              técnicas descritas nesta Política.
            </p>
          </section>

          <section>
            <h2>7. Segurança</h2>

            <p>
              A EOC Tech adota medidas razoáveis para proteger as informações
              sob seu controle.
            </p>

            <p>
              O Tretix Neon não mantém um banco de dados próprio de informações
              pessoais dos jogadores.
            </p>

            <p>
              As informações transmitidas pelo Google Mobile Ads SDK são
              protegidas durante a transmissão conforme os mecanismos de
              segurança disponibilizados pela Google.
            </p>

            <p>
              Nenhum método de armazenamento ou transmissão pela internet pode
              ser considerado absolutamente seguro, portanto não é possível
              garantir segurança absoluta.
            </p>
          </section>

          <section>
            <h2>8. Retenção e exclusão</h2>

            <p>
              O recorde do jogador permanece armazenado localmente no dispositivo
              enquanto os dados locais do aplicativo não forem apagados.
            </p>

            <p>
              O usuário pode remover esse dado por meio dos mecanismos de
              limpeza de dados do aplicativo ou desinstalando o aplicativo,
              conforme os recursos disponíveis no sistema operacional.
            </p>

            <p>
              Como a EOC Tech não mantém um banco de dados próprio com os
              recordes, não há uma conta própria do Tretix Neon contendo esses
              dados para exclusão.
            </p>

            <p>
              Informações eventualmente tratadas por serviços de terceiros,
              como o Google AdMob, estão sujeitas às políticas e aos mecanismos
              de controle desses terceiros.
            </p>
          </section>

          <section>
            <h2>9. Crianças</h2>

            <p>
              O Tretix Neon não é destinado especificamente a crianças menores
              de 13 anos.
            </p>

            <p>
              A EOC Tech não solicita deliberadamente informações pessoais de
              crianças.
            </p>

            <p>
              Caso um responsável legal identifique que uma criança forneceu
              informações pessoais diretamente à EOC Tech, poderá entrar em
              contato pelo endereço indicado nesta Política para solicitar
              orientação ou providências cabíveis.
            </p>
          </section>

          <section>
            <h2>10. Direitos dos usuários</h2>

            <p>
              Dependendo da legislação aplicável, os usuários podem possuir
              direitos relacionados ao tratamento de seus dados pessoais,
              incluindo direitos de acesso, correção, eliminação, informação e
              outros direitos previstos na legislação aplicável.
            </p>

            <p>
              No Brasil, esses direitos são exercidos observando-se a
              <strong> Lei Geral de Proteção de Dados Pessoais (LGPD)</strong>
              e a regulamentação aplicável.
            </p>

            <p>
              Solicitações relacionadas ao tratamento de dados pela EOC Tech
              podem ser encaminhadas para:
            </p>

            <p>
              <strong>emerson-oli@hotmail.com</strong>
            </p>

            <p>
              Quando o tratamento de dados for realizado diretamente por
              terceiros, como a Google, determinadas solicitações deverão ser
              direcionadas ao respectivo fornecedor.
            </p>
          </section>

          <section>
            <h2>11. LGPD</h2>

            <p>
              Para usuários no Brasil, o tratamento de dados pessoais
              relacionado ao Tretix Neon observará, quando aplicável, a
              <strong>
                {" "}
                Lei nº 13.709/2018 — Lei Geral de Proteção de Dados Pessoais
                (LGPD)
              </strong>
              .
            </p>

            <p>
              A EOC Tech busca aplicar os princípios de transparência,
              finalidade, necessidade, segurança e adequação ao tratamento de
              informações sob sua responsabilidade.
            </p>
          </section>

          <section>
            <h2>12. Alterações nesta Política</h2>

            <p>
              Esta Política de Privacidade poderá ser atualizada periodicamente
              para refletir alterações no aplicativo, nos serviços utilizados,
              na legislação ou nas práticas de tratamento de dados.
            </p>

            <p>
              Quando houver alterações relevantes, a data de atualização
              indicada no início desta Política será modificada.
            </p>

            <p>
              Recomendamos que os usuários consultem esta página periodicamente.
            </p>
          </section>

          <section>
            <h2>13. Contato</h2>

            <p>
              Para dúvidas, solicitações ou questões relacionadas à privacidade
              e proteção de dados no Tretix Neon, entre em contato:
            </p>

            <p>
              <strong>EOC Tech</strong>
              <br />
              <strong>E-mail:</strong>{" "}
              <a
                href="mailto:emerson-oli@hotmail.com"
                className="text-cyan-400 hover:underline"
              >
                emerson-oli@hotmail.com
              </a>
            </p>
          </section>

          <footer className="border-t border-slate-800 pt-6 text-sm text-slate-500">
            <p>Desenvolvido por EOC Tech</p>
            <p>Aplicativo: Tretix Neon</p>
            <p>Última atualização: 13 de agosto de 2026</p>
          </footer>
        </article>
      </div>
    </main>
  );
}