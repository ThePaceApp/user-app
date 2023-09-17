import React, { useState } from 'react'
import "./profile.css"
import emoji from "../../../assets/Emoji.png"
import nig from "../../../assets/user.png"

const defaultImageSrc = nig

const initialFieldValues={
  name:"",
  Email:"",
  Gender:"",
  imageName:"",
  DOB:"",
  imageSrc:defaultImageSrc,
  Level:"",
  imageFile:'null'
}


const Profile = () => {
  const [values, setValues] = useState(initialFieldValues)

  const handleInputChange = (e) =>{
    const { name,value} = e.target;
    setValues({
      ...values,
      [name]:value
    })
  }
  const showPreview = e =>{
    if (e.target.files && e.target.files[0]){
      let imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.onload = x => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result
        })
      }
      reader.readAsDataURL(imageFile)
    }
    else{
      setValues({
        ...values,
        imageFile:null,
        imageSrc:defaultImageSrc
      })
    }
  } 
  return (
    <div className='profileCont'>
        <div className='profileside'></div>
        <div className='profiledetails'>
          <div className='profilehead'>
            <div style={{display:'flex',justifyContent:"space-between",alignItems:"center"}}>
              <h3 style={{fontSize:"2.5rem",color:"#16956C",fontWeight:"800"}}>Complete Profile</h3>
              <p >1/3</p>
            </div>
            <div style={{display:"flex", alignItems:'center',gap:'5px',marginTop:'5px'}}>
              <p style={{fontSize:"1rem"}}>Let know you better</p>
              <img src={emoji} alt=""/>
            </div>
          <form autoComplete='off' noValidate>
            <div className='profileForms'>
              <div className='profileimage'>
                <img src={values.imageSrc} alt='profileImg' />
                </div>
                <input type="file" accept='image/*'
                  onChange={showPreview}
                />
              <div className='profileform'>
                <div style={{display:"flex", flexDirection:"column"}}>
                <label style={{fontWeight:'200'}}>Full name </label>
                <input type='name' placeholder='full name'
                 values={values.name}
                 onChange={handleInputChange}
                 />
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                <label style={{fontWeight:'200'}}>E-mail </label>
                <input type='Email' placeholder='full name' values={values.Email}/>
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                <label style={{fontWeight:'200'}}>Gender</label>
                <input list="gender" type='name'  values={values.Gender}/>
                  <datalist id="gender">
                    <option value="Male" >Gender</option>
                    <option value="Female"></option>
                  </datalist>
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                <label style={{fontWeight:'200'}}>Date of birth</label>
                <input type="month" placeholder='full name' values={values.DOB}/>
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                <label style={{fontWeight:'200'}}>Level of Study </label>
                <input list='level' type='name' placeholder='level' values={values.Level}/>
                <datalist id="level">
                    <option value="O'Level"></option>
                    <option value="A'Level"></option>
                    <option value="Jamb"></option>
                  </datalist>
                </div>
              </div>
            </div>
              <button style={{width:"100%",backgroundColor:"#16956C", color:"#ffff", fontSize:"25px"}}>Submit</button>
            </form>
            </div>
        </div>
        <div className='profileside'></div>
        
    </div>
  )
}

export default Profile
