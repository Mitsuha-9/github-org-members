import { useState, useEffect } from "react"
import Loading from "./Loading"
import Profile from "./Profile"
import { Octokit } from "octokit"
// const singleUser = `https://api.github.com/users/SankThomas`
// const repos = `https://api.github.com/users/sankthomas/repos?per_page=5`
// https://api.github.com/users/sankthomas/repos?page=1&per_page=10&sort=updated

function App() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  let [count, setCount] = useState(1)
  // Change this to any username whose repositories you want to get
  const [user] = useState("sankthomas")
  // let count=1;
  
  useEffect(() => {

    const fetchRepos = async () => {
      // Octokit.js
// https://github.com/octokit/core.js#readme
const octokit = new Octokit({
  auth: process.env.REACT_APP_AUTH_TOKEN
})


const res = await octokit.request('GET /orgs/{org}/members?page={pg}', {
  org: 'mozilla',
  pg: count,
  headers: {
    'X-GitHub-Api-Version': '2022-11-28',
    // 'link': '<https://api.github.com/organizations/131524/members?page=2>; rel="next", <https://api.github.com/organizations/131524/members?page=8>; rel="last"'
  }
})
     
    
      setItems(res.data)
      console.log(res.data)
    }


    fetchRepos()
  }, [count])

  return (
    <>
      <div className="pt-10">
        <h1 className="mb-10 font-bold text-3xl text-center text-blue-800">
          Viewing mozilla's members
        </h1>
      </div>

      {!items ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 pb-20">
          {items.map((item) => (
            <Profile key={item.id} {...item} />
          ))}
        </div>
      )}
      <div className="pagination" class="flex items-center justify-center text-xl p-14">
  {isLoading ? (
    <p>Loading...</p>
  ) : (
    <>
     <button
        disabled={count === 1}
        onClick={() => setCount((prevState) => prevState - 1)}
        class="p-8 border-md bg-blue-400 w-auto shadow-md font-bold rounded-lg"
      >
        Prev
      </button>
      <p class="p-8 font-bold">{count<5 ? count : 1}</p>
       
     <button onClick={() => setCount((prevState) => prevState===4 ? prevState=1 : prevState + 1)} class="rounded-lg p-8 border-md bg-blue-400 w-auto shadow-md font-sans font-bold">
        Next
      </button>

    </>
  )}
</div>
    </>
  )
}

export default App
