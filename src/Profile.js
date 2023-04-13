import React from "react"
import { format } from "date-fns"

export default function Profile(props) {
  return (
    <>
      <article className="bg-white p-5 rounded shadow shadow-blue-300">
        <a href={props.html_url} target="_blank" rel="noreferrer">
        <div className="flex items-center">
          <img
            src={props.avatar_url}
            alt={props.login}
            className="w-16 h-16 shadow rounded-full"
          />
          <ul className="ml-5">
            <li>
              <h2 className="font-bold text-xl text-blue-900">{props.login}</h2>
            </li>
          </ul>
        </div>
</a>
       

      </article>
    </>
  )
}
