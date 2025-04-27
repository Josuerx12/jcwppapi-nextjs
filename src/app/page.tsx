import RequestSignupBtn from "@/components/buttons/request-signup-btn";
import StartNowBtn from "@/components/buttons/start-now-btn";
import { CircleCheckBig, HandCoins, Headset } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 py-16 max-w-7xl mx-auto">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Conecte-se ao WhatsApp de forma simples e acessível
          </h1>
          <p className="text-gray-700 text-lg mb-8">
            O <strong>jcwpp</strong> é a solução perfeita para quem precisa
            integrar o WhatsApp de forma fácil, rápida e econômica. API não
            oficial com suporte 100% brasileiro e em tempo real!
          </p>
          <StartNowBtn />
        </div>
        <div className="mt-12 md:mt-0 md:ml-12">
          <Image
            src="/images/jcwppapi.png"
            alt="Conexão WhatsApp"
            width={500}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-8 grid md:grid-cols-3 gap-12">
          <div className="text-center">
            <div className=" text-green-500 p-2 rounded-full mx-auto w-32 h-32">
              <Headset size={100} />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Suporte em Tempo Real
            </h3>
            <p className="text-gray-600">
              Equipe brasileira disponível para te ajudar sempre que precisar.
            </p>
          </div>
          <div className="text-center">
            <div className=" text-green-500 p-2 rounded-full mx-auto w-32 h-32">
              <CircleCheckBig size={100} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fácil Integração</h3>
            <p className="text-gray-600">
              Utilize nossa API de forma prática com documentação clara e
              exemplos.
            </p>
          </div>
          <div className="text-center">
            <div className=" text-green-500 p-2 rounded-full mx-auto w-32 h-32">
              <HandCoins size={100} />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              Preço que Cabe no Seu Bolso
            </h3>
            <p className="text-gray-600">
              Planos acessíveis para todos os tamanhos de projeto e negócios.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-green-500 text-white text-center">
        <h2 className="text-3xl font-bold mb-6">
          Pronto para integrar seu sistema ao WhatsApp?
        </h2>
        <RequestSignupBtn />
      </section>
    </div>
  );
}
