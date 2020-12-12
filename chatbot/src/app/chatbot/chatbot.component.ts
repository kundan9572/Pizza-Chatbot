import { Component, OnInit } from '@angular/core';
import { exit } from 'process';
import { ChatbotService } from '../chatbot.service'

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

constructor(private api:ChatbotService) { }
  answer:any=[];
  data: any = [];
  vegpizza: any = [];
  nonvegpizza: any = [];
  totalCost: number = 0;
  orderNumber: number = this.getOrderNum();

  ngOnInit(): void {
   window.setInterval(() => {
    this.updateScroll();
    }, 100000);
    this.start();        
  }

  //for reloading the the bot
  reload() {
    setInterval(() => {
    window.location.reload();
    }, 10000);  
  }

  updateScroll() {
    const id = document.getElementById("chatContainer");
    id.scrollTop = id.scrollHeight;
  }       

  start() {
            var start=document.createElement('h3');
            start.innerHTML="How can I help you ???";
            start.id="user";
            start.className="chatarea-inner user"
            document.getElementById('massage').appendChild(start);
          this.buttoncreate();
    }


  massage(massage:any)
  {
    this.data=massage.split(' ');
   console.log(this.data);
    (<HTMLInputElement>document.getElementById("form__input")).value=''
    if(massage==''){
      alert("Please Enter Some Value")
    }
    this.api.getMassage()
    .subscribe(data => {
      this.answer = data;

       console.log(this.data)
       console.log(this.answer)
      
      for(let i=0;i<this.data.length;i++)
      {
        for(let j=0;j<this.answer.length;j++)
        { 
          if(this.data[i] == this.answer[j].answer){
            var userinput=document.createElement('div');
            userinput.innerHTML=this.data[i];
            userinput.id="user";
            userinput.className="chatarea-inner user"
            document.getElementById('massage').appendChild(userinput);

            var answer=document.createElement('div');
            answer.innerHTML=this.answer[j].question;
            answer.className="chatarea-inner chatbot"
            document.getElementById('massage').appendChild(answer);   
          }
          else if (this.data[i] == "order") {
            this.pizzatype();
            exit(1);
          }
          else if (this.data[i] == "status") {
            this.checkstatus();
            exit(1);
          }
          else if (this.data[i] == "help") {
            this.help();
            exit(1);
          }
          else if (this.data[i] == "veg") {
            this.showvegpizza();
            exit(1);
          }
          else if (this.data[i] == "nonveg") {
            this.shownonvegpizza();
            exit(1);
          }
        }       
      }
    },error => console.log(error));  
  }

  buttoncreate() {
    var value = ["order pizza", "check status", "help", "exit"]
    console.log(value);

    for (let i = 0; i < value.length; i++){
      var btn = document.createElement('button');
      btn.innerHTML = value[i];
      btn.className="chatarea-inner user"
      btn.addEventListener("click", (e:Event) => this.operation(i, value));
      document.getElementById('massage').appendChild(btn);

    }
  }

  operation(i,value) {
    if (i == 0) { 
      this.buttonResponse(i, value);
      this.pizzatype();
    }
    else if (i == 1) { 
      this.buttonResponse(i, value);
      this.checkstatus();
    }
    else if (i == 2) {
      this.buttonResponse(i,value)
      this.help();
    }
    else {
      alert("Thanks For choosing us.")
      this.reload();
    }
  }

  
  pizzatype() {
    
    var value = ["Veg","Non-Veg", "exit"]
    console.log(value);

    for (let i = 0; i < value.length; i++) {
      var btn = document.createElement('button');
      btn.innerHTML = value[i];
      btn.id = "user";
      btn.addEventListener("click", (e: Event) => this.vegCategory(i,value));
      btn.className = "chatarea-inner btn"
      document.getElementById('massage').appendChild(btn);
    }
  }

  vegCategory(i,value) {
    if (i == 0) {
      this.buttonResponse(i, value)
      this.selectpizza();
      this.showvegpizza();
    }
    else if (i == 1) {
      this.buttonResponse(i, value);
      this.selectpizza();
       this.shownonvegpizza();
    }
    else {
      this.buttoncreate();
    }
    
  }

      buttonResponse(i,value) {
        var response=document.createElement('div');
        response.innerHTML= "You had selected "+value[i];
        response.className="chatarea-inner chatbot"
        document.getElementById('massage').appendChild(response);
      }
  
  selectpizza() {
    var selectpizza=document.createElement('div');
    selectpizza.innerHTML = "Select Your Favourite Pizza !!!";
    selectpizza.id = "user";
    selectpizza.className = "chatarea-inner user"
    document.getElementById('massage').appendChild(selectpizza);
  }

  showvegpizza() {
    this.api.getVegPizza()
      .subscribe(data => {
        this.vegpizza = data;
        console.log(this.vegpizza);

        for (let i = 0; i < this.vegpizza.length; i++) {
          var veg = document.createElement('button');
          veg.innerHTML = this.vegpizza[i].name + "   " + "    Price:  " + " " + this.vegpizza[i].price;
         // veg.id = "user";
          veg.className = "chatarea-inner chatbot"
          veg.addEventListener("click", (e: Event) => this.selectquality(this.vegpizza[i].name,this.vegpizza[i].price));
          document.getElementById('massage').appendChild(veg);
        }
      });
  }

  shownonvegpizza() {
    
    this.api.getNonVegPizza()
      .subscribe(data => {
        this.nonvegpizza = data;
        console.log(this.nonvegpizza);

        for (let i = 0; i < this.nonvegpizza.length; i++) {
          var nonveg = document.createElement('button');
          nonveg.innerHTML = this.nonvegpizza[i].name +"    "+ "    Price:  "+"  "+this.nonvegpizza[i].price;
          nonveg.className = "chatarea-inner chatbot";
          nonveg.addEventListener("click", (e: Event) => this.selectquality(this.nonvegpizza[i].name,this.nonvegpizza[i].price));
          document.getElementById('massage').appendChild(nonveg);
        }
      });
  }
  buttonResponse1(name,value) {
        var response=document.createElement('div');
        response.innerHTML= "You had selected "+ name + " which cost "+ value + " INR.";
        response.className="chatarea-inner chatbot"
        document.getElementById('massage').appendChild(response);
  }
  
  selectquality(name: any, price: any) {
    console.log(this.selectpizza);
    console.log(price);
    this.buttonResponse1(name,price)
    var quantity=document.createElement('div');
    quantity.innerHTML = "Enter the Quantity of Pizza !!!";
    quantity.id = "user";
    quantity.className = "chatarea-inner user"
  //  quantity.addEventListener("click", (e: Event) => this.totalPrice(price));
    document.getElementById('massage').appendChild(quantity);
    this.takequantity(price);

  }

  takequantity(price) {
    var quan = prompt("Enter the Quantity .")
    var num = parseInt(quan)
    this.totalPrice(price,num)
  }

  userInput1(data) {
        var response=document.createElement('div');
        response.innerHTML= "Total Quantity of pizza is :  "+ data ;
        response.className="chatarea-inner chatbot"
        document.getElementById('massage').appendChild(response);
  }

  totalPrice(price: any,num) {
    // var quan = prompt("Enter the Quantity .")
    // var num = parseInt(quan)
    var totalPrice =  num * price;
    this.totalCost = totalPrice;
    console.log(totalPrice);
    this.userInput1(num);
    var total = document.createElement('h3');
    total.innerHTML = "Total cost of   " + num + "  pizza is "+ "" +totalPrice;
    total.id = "user";
    total.className = "chatarea-inner user"
   // total.addEventListener("click", (e: Event) => this.payment());
    document.getElementById('massage').appendChild(total);
    //return totalPrice;
    this.payment();
  }

  
  payment() {
    var total=document.createElement('div');
    total.innerHTML = "How you like to pay ???";
    total.id = "user";
    total.className = "chatarea-inner user"
    document.getElementById('massage').appendChild(total);

    var method = ["COD","UPI", "CARD","WALLET"]
    console.log(method);

    for (let i = 0; i < method.length; i++) {
      var btn = document.createElement('button');
      btn.innerHTML = method[i];
      btn.id = "user";
      btn.addEventListener("click", (e: Event) => this.operation2(i,method));
      btn.className = "chatarea-inner chatbot"
      document.getElementById('massage').appendChild(btn);
    }
  }


  operation2(i,value) {
    if (i == 0) { 
      this.buttonResponse(i, value);
      this.deliveryDetails(value[i])
    }
    else if (i == 1) { 
      this.buttonResponse(i, value);
      this.deliveryDetails(value[i])
    }
    else if (i == 2) {
      this.buttonResponse(i, value);
      this.deliveryDetails(value[i])
    }
    else if (i == 3) {
      this.buttonResponse(i, value);
      this.deliveryDetails(value[i])
    }
    else {
      alert("Thanks For choosing us.")
    }
  }

  deliveryDetails(method:any) {
    var name = prompt("enter name");
    var address = prompt("enter your complete address");
    let x = 123
    //passing order details to database
    let date = new Date().toDateString;

    this.api.putdetail(this.orderNumber, name, address, method, 'xyz', x, this.totalCost, "Success").subscribe(data => {
      console.log(data);
  });

    //var btn = document.createElement('button');
     //btn.addEventListener("click", (e: Event) => this.delivermsg());
    this.delivermsg();
  }

  delivermsg() {
    var msg=document.createElement('p');
    msg.innerHTML = "Thankyou your order has been successfully placed and your order number is " + this.orderNumber
    +" and will deliver in "+ this.getTime() +"pm .\n Thanks for ordering with us . ";
    msg.id = "user";
    msg.className = "chatarea-inner user"
    document.getElementById('massage').appendChild(msg);
    this.buttoncreate()
  }

  // Implementation Of check Order Status


  checkstatus() {
    var check = ["Check Order Status", "Cancel Order"]
    for (let i = 0; i < check.length; i++) {
      var btn = document.createElement('button');
      btn.innerHTML = check[i];
      btn.id = "user";
      btn.addEventListener("click", (e: Event) => this.statusImpl(i,check));
      btn.className = "chatarea-inner btn"
      document.getElementById('massage').appendChild(btn);
    }
  }

  statusImpl(i,check) {
    if (i == 0) {
      this.buttonResponse(i, check)
      this.checkOrderStatus()
    }
    else if (i == 1) {
      this.buttonResponse(i, check);
      this.canceldOrder();
    }
    else {
      this.buttoncreate();
    }
    
  }

  // checking order status
  checkOrderStatus() {
    var ordId = prompt("Enter Order Id")
    var id = parseInt(ordId)
    console.log(ordId);
    this.api.getOrderStatus(id).subscribe( data => {
    console.log(data);

    var h2=document.createElement('p')
    h2.innerHTML="Your Booking Id -> "+data[0].oid +" "+"with customer name  -> "+data[0].name+" and address " + data[0].address + " will deliver  within 30 min.";
    h2.className="chatarea-inner btn"        
      document.getElementById('massage').appendChild(h2);
      this.buttoncreate();
      });
     
  }

  canceldOrder() {
    
    let ordId = prompt("Enter Order Id")
    var id = parseInt(ordId) 
    console.log(ordId);

    var dispmsg = document.createElement('p');
    dispmsg.innerHTML="Your Order with Order Id -> "+ordId +" has been cancelled successfully .Your money will be refunde back to the original Payment method within 2-3 working days.  Thankyou for placing order with us.";
    dispmsg.className = "chatarea-inner btn";        
    document.getElementById('massage').appendChild(dispmsg);

    this.api.cancelOrder(id).subscribe( data => {
      console.log(data);
      this.buttoncreate();
      });
  }

  //help implementation

  help() {
    
    var help = ["complaint about product", "Refund Process"]
    for (let i = 0; i < help.length; i++) {
      var btn = document.createElement('button');
      btn.innerHTML = help[i];
      btn.id = "user";
      btn.addEventListener("click", (e: Event) => this.helpImpl(i,help));
      btn.className = "chatarea-inner btn"
      document.getElementById('massage').appendChild(btn);
    }
  }

  helpImpl(i,check) {
    if (i == 0) {
      this.buttonResponse(i, check)
      this.productIssue()
    }
    else if (i == 1) {
      this.buttonResponse(i, check);
      this.refundProcess();
    }
    else {
      this.buttoncreate();
    }
    
  }

  productIssue() {
    var product = ["Related to Pizza", "Related to Pizza delivery"]
    for (let i = 0; i < product.length; i++) {
      var btn = document.createElement('button');
      btn.innerHTML = product[i];
      btn.id = "user";
      btn.addEventListener("click", (e: Event) => this.productImpl(i,product));
      btn.className = "chatarea-inner btn"
      document.getElementById('massage').appendChild(btn);
    }
  }

  productImpl(i,check) {
    if (i == 0) {
      this.buttonResponse(i, check)
      this.feedback()
    }
    else if (i == 1) {
      this.buttonResponse(i, check);
      this.feedback();
    }
    else {
      this.buttoncreate();
    }
    
  }

  feedback() {
            var feed=document.createElement('div');
            feed.innerHTML="Please give your feedback where we need to improve . We will take this as priority.";
            feed.id="user";
            feed.className="chatarea-inner user"
            document.getElementById('massage').appendChild(feed); 
            this.feedbackmsg();
  }

  feedbackmsg() {
            var feedmsg = document.createElement('div');
            feedmsg.innerHTML = "send your feedback on <strong>www.pizzawala.com</strong>";
            feedmsg.id="user";
            feedmsg.className="chatarea-inner user"
            document.getElementById('massage').appendChild(feedmsg);
            this.sorrymsg();
  }

  sorrymsg() {
    var reply=document.createElement('div');
            reply.innerHTML="Sorry for inconvinence cause, I assured it will not happen again .";
            reply.id="user";
            reply.className="chatarea-inner user"
    document.getElementById('massage').appendChild(reply);
    
    var r1=document.createElement('textfield');
            r1.innerHTML="  ";
            r1.id="user";
            r1.className="chatarea-inner user"
            document.getElementById('massage').appendChild(r1);
            //alert("Thanks For choosing us.")
            this.buttoncreate();
  }

  refundProcess(){
    //this.canceldOrder();
    let ordId = prompt("Enter Order Id")
      var dispmsg = document.createElement('p');
      dispmsg.innerHTML="Your Order with Order Id -> "+ ordId +" has been cancelled and refund will be issued in 2-3 working days.";
      dispmsg.className = "chatarea-inner btn";        
      document.getElementById('massage').appendChild(dispmsg);
      alert("Thanks For choosing us.")
      
  }

  getOrderNum() {
    var ordNum = Math.floor(Math.random()*(9*(Math.pow(10,4))))+(Math.pow(10,4))
    return ordNum;
  }

  getTime() {
    var now = new Date();
    var hrs = 0;
    var min = 0;
    var extTime = '';
    var gethrs = now.getHours();
    var getmin = now.getMinutes();
    var totTime = getmin + 30;

    if (totTime > 59) {
      min = Math.abs(60 - totTime);
      hrs = gethrs + 1;  
      extTime = hrs + ":" + min;
      return extTime
    }
    else {
      var mins = getmin + 30;
      extTime = gethrs + ":" + mins ;
      return extTime;
    }
     
  }
  
  
}
