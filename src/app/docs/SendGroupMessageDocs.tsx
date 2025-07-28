import React from "react";

const SendGroupMessageDocs = () => {
  return (
    <div className="w-full text-wrap mx-auto text-left">
      <h3 className="text-lg font-bold mb-2 text-gray-800">
        Como usar a API para enviar mensagem em um grupo
      </h3>
      <ol className="list-decimal list-inside text-gray-700 mb-4 space-y-2">
        <li>
          <strong>Endpoint:</strong>
          <div className="bg-gray-100 rounded px-2 py-1 mt-1 font-mono text-sm break-all">
            POST /instance/&lt;sessionId&gt;/send-group-text
          </div>
        </li>
        <li>
          <strong>Headers:</strong>
          <div className="bg-gray-100 rounded px-2 py-1 mt-1 font-mono text-sm">
            secret:{" "}
            <span className="text-green-700">&lt;seu_token_secreto&gt;</span>
          </div>
        </li>
        <li>
          <strong>Body (JSON):</strong>
          <pre className="bg-gray-100 break-all text-wrap rounded px-2 py-2 mt-1 font-mono text-sm overflow-x-auto">{`{
  "groupId": "1234567812313213213123@g.us",
  "message": "Mensagem de teste para o grupo!"
}`}</pre>
        </li>
        <li>
          <strong>Exemplo de requisição curl:</strong>
          <pre className="bg-gray-100 break-all text-wrap rounded px-2 py-2 mt-1 font-mono text-xs overflow-x-auto">
            {`curl -X POST 
https://jcwppapi.jcdev.com.br/instance/SEU_INSTANCE_ID/send-group-text 
-H "Content-Type: application/json" 
-H "secret: SEU_TOKEN_SECRETO" 
-d '{
  "groupId": "1234567812313213213123@g.us",
  "message": "Mensagem de teste para o grupo!"
}'
`}
          </pre>
        </li>
      </ol>
      <p className="text-gray-500 text-xs mt-2">
        Substitua <span className="font-mono">SEU_INSTANCE_ID</span> e{" "}
        <span className="font-mono">SEU_TOKEN_SECRETO</span> pelos valores da
        sua instância e token.
      </p>
    </div>
  );
};

export default SendGroupMessageDocs;
