import React, { useEffect, useState } from 'react'

export default function (props) {
    
    const[reports,setreports]=useState([]);
    let mywallet=props.transaction;
    useEffect(()=>{
            help();  
    },[]);
    async function fetchtranscation()
    {   
        const response=await fetch(`http://localhost:4300/users/api/fetchalltransaction/${mywallet}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include'
        }
        );
        const result =await response.json();
        let wallet=result?.data[0];
        let user=result?.data?.[1];
        let transtable=[];

        wallet?.forEach((item, index) => {

        item._id,item.Amount,item.discountPercent
        user[index]?.user?.Name
        transtable.push({"tid":item._id,"Amount":item.Amount,"discountPercent":item.discountPercent,"name":user[index].user.Name});
        });
        return transtable;
    }
    async function help(){
        let newArray=await fetchtranscation();
        setreports(newArray);
        };
  return (
    <>
     <div  className='col-3'>
                <h2>Transaction Report for you</h2>
                <table >
                <tr>
                    <th>Transaction Id</th>
                    <th>Name</th>
                    <th>Amount</th>
                    <th>discount</th>
                </tr>
                {
                    reports?.map((iter)=>{
                    return(
                        <tr>
                            <td style={{color:'#2f4eff'}}>{iter.tid}</td>
                            <td>{iter.name}</td>
                            <td style={{color:'orange'}}>{iter.Amount}</td>
                            <td style={{color:'red'}}>{iter.discountPercent+"%"}</td>
                        </tr>
                    )
                    })
                }
                </table>

            </div>

    </>
  )
}
