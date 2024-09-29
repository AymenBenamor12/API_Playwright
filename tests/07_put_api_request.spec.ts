// load playwright module

import { request } from "http"

import { test, expect } from '@playwright/test';
import { stringFormat } from "../utils/common";


const bookingAPIrequestBody= require('../test-data/post_dynamic_request_body.json');
const tokenRequestBody= require('../test-data/token_request_body.json');
const putRequestBody = require('../test-data/put_request_body.json');


// write a test
test('Create Put api request Playwright ',async({request})=>{
  
  const dynamicRequestBody = stringFormat(JSON.stringify(bookingAPIrequestBody),"testers talk cypress ","testers talk javascript","apple")
  
  console.log("======================= POST API  ===========================")

  //create POST api request
  const postAPIResponse= await request.post(`/booking`,{
    data: JSON.parse(dynamicRequestBody)
    })

     //validate status code 
     expect(postAPIResponse.ok()).toBeTruthy();
     expect(postAPIResponse.status()).toBe(200);

    const postAPIResponseBody=await postAPIResponse.json();  
    console.log(postAPIResponseBody);
    const bId = postAPIResponseBody.bookingid;

//Validate JSON api response
expect(postAPIResponseBody.booking).toHaveProperty("firstname", "testers talk cypress")
expect(postAPIResponseBody.booking).toHaveProperty( "lastname", "testers talk javascript")


//Validate Nested JSON objects
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty("checkin", "2018-01-01")
expect(postAPIResponseBody.booking.bookingdates).toHaveProperty( "checkout", "2019-01-01",)

console.log("======================= GET API  ===========================")

// GET api call
const getAPIresponse = await request.get(`/booking/${bId}`)
console.log(await getAPIresponse.json())

//validate status code
expect(getAPIresponse.ok()).toBeTruthy();
expect(getAPIresponse.status()).toBe(200);

// Generate Token
const tokenResponse= await request.post(`/auth`,{
    data:tokenRequestBody
})

const tokenAPIResponseBody = await tokenResponse.json();
const tokenNo = tokenAPIResponseBody.token
console.log('Token no is'+tokenNo)

console.log("======================= PUT API  ===========================")

// Put api call
const putResponse =await request.put(`/booking/${bId}`,{
    headers:{
        "Content-Type":"application/json",
        "Cookie":`token=${tokenNo}`
    },
    data:putRequestBody
    
})
const putResponseBody =await putResponse.json();
console.log(putResponseBody)

// Validate status code 
expect(putResponse.status()).toBe(200)
});