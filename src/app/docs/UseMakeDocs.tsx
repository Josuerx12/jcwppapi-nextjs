import React from "react";

const UseMakeDocs = () => {
  return (
    <div className="w-full mx-auto text-left">
      <h3 className="text-lg font-bold mb-2 text-gray-800">
        Como integrar a JCWPPAPI com o Make (Integromat)
      </h3>
      <p className="text-gray-700 mb-4">
        Veja abaixo um vídeo rápido mostrando como criar um cenário no Make para
        enviar mensagens usando a JCWPPAPI e automatizar seus fluxos:
      </p>
      <div className="w-full aspect-video mb-4 rounded overflow-hidden border border-gray-200">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/2Q_ZzBGPdqE"
          title="Como integrar JCWPPAPI com Make"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-gray-700 text-sm mb-1">
          Clique no botão abaixo para acessar o convite do app JCWPPAPI no Make
          e começar a integrar:
        </span>
        <a
          href="https://www.make.com/en/hq/app-invitation/f1a7ed41eade6ff5e010ec20b734a035" // Substitua pelo link real do convite do app no Make
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-fit bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded transition-colors duration-200 shadow"
        >
          Acessar App JCWPPAPI no Make
        </a>
      </div>
      <p className="text-gray-500 text-xs mt-4">
        Siga o vídeo e utilize o botão acima para facilitar sua automação com a
        plataforma Make.
      </p>
    </div>
  );
};

export default UseMakeDocs;
