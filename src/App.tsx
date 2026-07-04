import axios from 'axios';
import { useEffect, useState } from 'react';
interface Data {
  author: string;
  download_url: string;
  url: string
}
const App = () => {
  const [imageData, setimageData] = useState<Data[]>([])
  const [pageNo, setpageNo] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(true)
  const getData = async () => {
    setLoading(true)
    try {
      const response = await axios.get<Data[]>(`https://picsum.photos/v2/list?page=${pageNo}&limit=20`)
      setimageData(response.data)
      console.log(response.data)
    } finally {
      setLoading(false)
    }
  }
  const increase = () => {
    setpageNo((prev) => prev + 1)
  }

  const decrease = () => {
    if (pageNo > 1) {
      setpageNo((prev) => prev - 1)
    }
  }

  useEffect(() => {
    getData()
  }, [pageNo])
  
  return (
    <>
      <div className='flex justify-center p-3 font-bold text-4xl'>
        <h1>
          Images
        </h1>
      </div>
      <div className='flex min-h-[60vh] flex-wrap items-center justify-center gap-5 p-3'>
        {loading ? (
          <div className='flex flex-col items-center justify-center gap-3'>
            <div className='h-12 w-12 animate-spin rounded-full border-4 border-black border-t-transparent' />
            <p className='text-lg font-semibold text-black'>Loading</p>
          </div>
        ) : (
          <>
            {imageData.map(function (elem, idx) {
              return (
                <a href={elem.url} key={idx}>
                  <div className='flex w-80 flex-col items-center overflow-hidden rounded-2xl shadow-lg'>
                    <div className="relative w-full">
                      <img
                        className='h-60 w-full rounded-1xl object-cover'
                        src={elem.download_url}
                        alt="" />
                    </div>
                    <div className="w-full bg-black/80 px-4 py-3 text-center">
                      <h2
                        className='text-xl font-bold text-white drop-shadow-lg'>
                        {elem.author}
                      </h2>
                    </div>
                  </div>
                </a>
              )
            })}
            <div className="flex w-full items-center justify-center gap-6 p-4">
              <button
                className='rounded-full bg-black px-5 py-2 font-semibold text-white 
          transition-transform active:scale-90'
                onClick={decrease}>
                Prev
              </button>
              <span className="rounded-full bg-gray-200 px-5 py-2 font-semibold">
                Page {pageNo}
              </span>
              <button 
            className='rounded-full bg-black px-5 py-2 font-semibold text-white 
          transition-transform active:scale-90'
                onClick={increase}>
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default App
