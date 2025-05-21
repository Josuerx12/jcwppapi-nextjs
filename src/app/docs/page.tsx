import React from "react";
import SendMessageDocs from "./SendMessageDocs";
import SendMessageTestForm from "./SendMessageTestForm";

const DocsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center text-center p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-4 text-green-600">Documentação</h1>

      <div className="w-full bg-neutral-50 mx-auto rounded-xl shadow p-6">
        <SendMessageDocs />
        <hr className="my-4" />
        <SendMessageTestForm />
      </div>

      <span className="mt-6 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">
        🚀 Novidades em breve...
      </span>
    </div>
  );
};

export default DocsPage;
