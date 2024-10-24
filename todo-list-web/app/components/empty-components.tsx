export default function EmptyListsComponents(props: {title:string}){
    return(
        <div className="p-2 mt-[20%] flex justify-center items-center">
            <h1 className="text-xl font-semibold mt-5 mb-2 text-center">
                Não há nada para mostrar.<br/> Cadastre uma {props.title}!
            </h1>
        </div>
    )
}