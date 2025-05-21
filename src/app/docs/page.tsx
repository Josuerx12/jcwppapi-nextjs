import React from "react";
import SendMessageDocs from "./SendMessageDocs";
import SendMessageTestForm from "./SendMessageTestForm";
import CreateGroupDocs from "./CreateGroupDocs";
import SendGroupMessageDocs from "./SendGroupMessageDocs";

const DocsPage = () => {
  return (
    <div className="min-h-screen flex gap-4 flex-col items-center text-center p-4 md:p-8">
      <h1 className="text-3xl font-bold text-green-600">Documentação</h1>

      <div className="w-full bg-neutral-50 mx-auto rounded-xl shadow p-6">
        <SendMessageDocs />
        <hr className="my-4" />
        <SendMessageTestForm />
      </div>

      <div className="w-full bg-neutral-50 mx-auto rounded-xl shadow p-6">
        <CreateGroupDocs />
      </div>

      <div className="w-full bg-neutral-50 mx-auto rounded-xl shadow p-6">
        <SendGroupMessageDocs />
      </div>

      <span className="mt-6 inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm">
        🚀 Novidades em breve...
      </span>
    </div>
  );
};

export default DocsPage;
