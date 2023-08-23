import { useState, useTransition, useDeferredValue } from "react"

let a = new Array(5000).fill(0);

export default function Ut() {

    let [name, setName] = useState('')
    let [isPending, 늦게처리] = useTransition();


    let state = useDeferredValue(name) //useTransition 랑 같은건데 함수안에 스테이트나 프롭스를 넣어서 name이라는 스테이트가 변할떄마다 늦게 해줌

    return(
        <div>
            <input onChange={(e)=> {
                늦게처리(()=> {
                    setName(e.target.value)
                })
            }} />

            {/* {
                isPending ? '로딩중' :
                a.map(()=> {
                    return <div>{state}</div>
                })
            } */}
        </div>
    )
}