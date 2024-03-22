const Insertbtn=document.querySelector(".insert-btn");
const Homebtn=document.querySelector(".home-btn");
const Viewbtn=document.querySelector(".view-btn");

Insertbtn.addEventListener("click",(event)=>{
    event.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('rid');
    window.location.href=`http://localhost:3000/create/${id}`;
})


Homebtn.addEventListener("click",(event)=>{
    event.preventDefault();
    window.location.href="http://localhost:3000/front";
})

Viewbtn.addEventListener("click",async(event)=>{
    event.preventDefault();


    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('rid');

    console.log("View id:", id);
    // console.log("view id"+id);
    // window.location.href="http://localhost:3000/getData";
    // window.location.href=`http://localhost:3000/getData?rid=${id}`;

    try{
        // alert("Data updated successfully");

        // const response=await fetch(`/api/v1/read/${id}`,{
        //     method:"GET",
        //     headers:{
        //         "Content-Type":"application/json",
        //     },
        //     body:JSON.stringify({title,desc}),
        // });
        window.location.href=`http://localhost:3000/getData?rid=${id}`;
    }
    catch(err){
        console.log(err.message);
        console.log("Not working");
    }
})