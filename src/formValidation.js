

export const formValidation=(event)=>{
    event.preventDefault();
    const fullnameRegex= /^([A-ZΑ-ΩΆΈΎΊΌΏΉ]{1,50}[a-zα-ωίϊΐόάέύϋΰήώ]{1,} *){2,}$/
    const emailRegex= /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    const idNumberRegex= /^[A-Z]{2}[\d]{6}$/
    const militaryNumberRegex=/^\d{3}\/\d+\/\d{4}$/

    const fullname=event.target[0].value
    const email=event.target[1].value
    const phoneNumber=event.target[2].value
    const idNumber=event.target[4].value
    const militaryNumber=event.target[5].value
    let errors=[]
    if (!fullname.match(fullnameRegex))
        errors.push("Wrong name format!")

    if (!email.match(emailRegex))
        errors.push("Wrong email format!")

    if (phoneNumber.length!==10 ||
        !(phoneNumber.substring(0,1).match('2') || phoneNumber.substring(0,2).match("69")))
        errors.push("Wrong phone number format!")

    if(!idNumber.match(idNumberRegex))
        errors.push("Wrong ID number format!")

    if(!militaryNumber.match(militaryNumberRegex))
        errors.push("Wrong military number format!")

    if(errors.length>0){
        console.log(errors)
        alert(errors.join('\n'))
    }else {
        fetch('http://localhost:8080/api/v1/form/addForm',{
            method: 'POST',
            body: new FormData(event.target)
        }).then(res=>{
            if(res.ok) {
                alert("Success!\nYou will be redirected to home page.")
            }else{
                alert("Server error!\nRedirecting to home page in 5s.")
            }
        }).catch(error=>alert('Client Error'+error)).then(setTimeout(function (){
            window.location.href="http://localhost:3000/login"},5000))
    }
}