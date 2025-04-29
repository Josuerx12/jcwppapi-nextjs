import React from "react";

const DocsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center text-center p-8">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Documentação</h1>
      <p className="text-gray-500 text-lg">
        Em breve você poderá acessar a documentação completa da{" "}
        <strong>JCWPPAPI</strong>.
      </p>
      <span className="mt-6 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">
        🚀 Novidades em breve...
      </span>
    </div>
  );
};

export default DocsPage;
