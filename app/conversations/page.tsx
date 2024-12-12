"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Home() {
  const conversations = useQuery(api.conversations.getConversations)
  const addConversation = useMutation(api.conversations.addConversation)
  const startCreateFile = useMutation(api.conversations.startCreateFile)


  const [when, setWhen] = useState((new Date()).toISOString().substring(0, 16));
  const [company, setCompany] = useState('');
  const [person, setPerson] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">

      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center gap-x-4" key="{_id}">
        <div className="text-xl font-medium text-black">
          <button
            className='navigation-button'
            onClick={() => {
              startCreateFile()
              redirect("/outputfiles/")
            }}>create file</button>
        </div>
      </div>
      <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center gap-x-4">
        <div className="text-xl font-medium text-black">
          when: <input type="text" className='text-input bg-slate-100' value={when} onChange={e => setWhen(e.target.value)} id="when" /><br />
          company: <input type="text" className='text-input bg-slate-100' value={company} onChange={e => setCompany(e.target.value)} id="company" /><br />
          person: <input type="text" className='text-input bg-slate-100' value={person} onChange={e => setPerson(e.target.value)} id="person" /><br />
          desc<br />
          <textarea className='text-input bg-slate-100' onChange={e => setDesc(e.target.value)} id="desc" value={desc}></textarea>
          <button
            className='navigation-button'
            onClick={() => {
              addConversation({ when: when, company: company, person: person, desc: desc })
            }}>+</button>
        </div>
      </div>
      {conversations?.map(({ _id, when, company, person, desc }) =>
        <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-lg flex items-center gap-x-4" key={_id}>
          <div className="text-xl font-medium text-black">{company}:{when}:{person}:{desc}</div>
        </div>
      )}
    </main>
  );
}
