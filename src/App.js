import React, {useEffect, useState} from 'react';
import axios from 'axios'; 

function App() {
  const [products, getProducts] = useState([]);
  const [product, updateProduct] = useState({ProdId:0, ProdName:'', Price:0});
  
  useEffect(()=>{
     axios.get("https://w1fbggxr8d.execute-api.ap-south-1.amazonaws.com/production/api/products")
          .then((response)=>{
            getProducts(response.data.data);
          })
          .catch((error)=>{
            console.log(`Error Occured ${error.message}`);
          });
  },[]);
  
  const save=()=>{
    axios.post("https://w1fbggxr8d.execute-api.ap-south-1.amazonaws.com/production/api/products",
     product, {
       headers:{
         "Content-Type":"application/json"
       }
     }).then((resp)=>{
       console.log(JSON.stringify(resp.data.data));
       getProducts([...products,{
         ProdId: resp.data.data.ProdId,
         ProdName: resp.data.data.ProdName,
         Price: resp.data.data.Price
       }]);
     }).catch((error)=>{
      console.log(`Error Occured ${error.message}`);
    });
  };
  
  return (
    <div className="container">
       <table className="table table-bordered table-striped">
          
         <tbody>
           <tr>
             
             <td>Product Id</td>
             <td>
               <input type="text" className="form-control"
                onChange={(evt)=>updateProduct({...product, ProdId:parseInt(evt.target.value) })}/>
             </td>
           </tr>
           <tr>
           <td>Product Name</td>
           <td>
             <input type="text" className="form-control"
              onChange={(evt)=>updateProduct({...product, ProdName:evt.target.value})}/>
           </td>
           </tr>
           <tr>
           <td>Price</td>
           <td>
             <input type="text" className="form-control"
              onChange={(evt)=>updateProduct({...product, Price:parseInt(evt.target.value)})}/>
           </td>
           </tr>
           <tr>
             <td>
               <input type="button" value="Save" className="btn btn-success"
                onClick={save}/>
             </td>
           </tr>
         </tbody>
       </table>
       <hr/>
       <div className="container">
         {JSON.stringify(products)}
       </div>
    </div>
  );
}

export default App;
