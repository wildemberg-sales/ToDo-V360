export default function LoadingComponent(){
    return(
        <div className='p-2 flex justify-center items-center h-[30%] flex-col'>
            <h2 className="text-xl font-semibold mt-5 mb-2">Carregando</h2>
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#7936BE] border-solid border-opacity-70"></div>
        </div>
    )
}