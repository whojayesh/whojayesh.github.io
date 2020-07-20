  var budgetController = ( function() {

       var Expense = function(id, description, value)
       {
              this.id = id;
              this.description = description;
              this.value = value;
              this.percentage = -1;
       };

       Expense.prototype.calPercentage = function(totalIncome)
       {
              if(totalIncome > 0)
              {
                     this.percentage = Math.round((this.value / totalIncome) * 100);
              }
              else
              {
                     this.percentage = -1;
              }
              
       };

       Expense.prototype.getPercentage = function()
       {
              return this.percentage;
       };

       var Income = function(id, description, value)
       {
              this.id = id;
              this.description = description;
              this.value = value;
       };

       

       var data = {

              allItems: {
                     exp: [],
                     inc: []
              },
              totals: {
                     exp: 0,
                     inc: 0
              },
              budget: 0,
              percentage: -1


       };


       var calTotal = function(type){

              var array = data.allItems[type];
              var sum = 0;
              array.forEach(  (el) => {
                     sum = sum + el.value;
              }  );

              data.totals[type] = sum;
       }

       return{

              addItem: function(type, description, value) 
              {
                     var newItem, id;

                     // 1. CREATE A NEW ID
                     var array = data.allItems[type];
                     if(array.length == 0)
                     {
                            id = 1;
                     }
                     else
                     {
                            id = array[array.length-1].id + 1;
                     }
                     

                     // 2. CREATE A OBJ
                     if(type === 'inc')
                     {
                            newItem = new Income(id, description, value);
                     }
                     else
                     {
                            newItem = new Expense(id, description, value);
                     }

                     // 3. PUSH THE OBJ IN OUR COLLECTIONS
                     data.allItems[type].push(newItem);
                     return newItem;

              },


              calBudget: function(){

                     //1. CAL TOTAL INCOME AND EXPENSE
                     calTotal("inc");
                     calTotal("exp");

                     //2. CAL THE INCOME - EXPENSE
                      data.budget = data.totals.inc - data.totals.exp;

                     //3. CAL THE % OF INCOME THAT WE SPENT
                     if(data.totals.inc > 0)
                     {
                         data.percentage = Math.round( (data.totals.exp / data.totals.inc) * 100 );
                     }
                     else
                     {
                         data.percentage = -1;
                     }
                     
              },

              getBudget: function() {
                     return data;
              },


              deleteItem: function(type, id){

                     var array = data.allItems[type];
                     var idArray = array.map(el => el.id);
                     var index = idArray.indexOf(id);

                     if(index !== -1)
                     {
                            data.allItems[type].splice(index, 1);
                     }

              },

              calculatePercentages: function()
              {
                  var totalIncome = data.totals.inc;
                  data.allItems['exp'].forEach(el => el.calPercentage(totalIncome)); 

              },

              getPercentages: function()
              {
                  var percent = data.allItems['exp'].map( el => el.getPercentage() );
                  return percent;  
              },

              test: function(){
                     console.log(data);
              }

       }



  })();

  
  //////////////////////////////////////////////////////////////////////////////////////////

  var UIController = ( function(){


              return{

                     getInput: function(){
                            return{
                                   type: document.querySelector('.add__type').value,
                                   desc: document.querySelector('.add__description').value,
                                   value: parseFloat(document.querySelector('.add__value').value)
                            }
                     },

                     addListItem: function(obj, type){

                            // 1. CREATE HTML STRING AND INSERT DATA INTO IT.

                            var html;

                            if(type === 'inc')
                            {
                                   html = `   <div class="item clearfix" id="inc-${obj.id}">
                                   <div class="item__description">${obj.description}</div>
                                   <div class="right clearfix">
                                       <div class="item__value">+ ${obj.value}</div>
                                       <div class="item__delete">
                                           <button class="item__delete--btn">
                                               <i class="ion-ios-close-outline"></i>
                                           </button>
                                       </div>
                                   </div>
                               </div>   `;
                            }
                            else{

                                   html = ` <div class="item clearfix" id="exp-${obj.id}">
                                   <div class="item__description">${obj.description}</div>
                                   <div class="right clearfix">
                                       <div class="item__value">- ${obj.value}</div>
                                       <div class="item__percentage">21%</div>
                                       <div class="item__delete">
                                           <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                       </div>
                                   </div>
                               </div>   `;

                            }



                            //2. INSERT THE HTML INTO THE DOM

                           if(type === 'inc')
                           {
                            document.querySelector('.income__list').insertAdjacentHTML('beforeend', html);
                           }
                           else
                           {
                            document.querySelector('.expenses__list').insertAdjacentHTML('beforeend', html);
                           }
                            
                     },

                     clearFields: function(){

                            var string = `.add__description, .add__value`;
                            var fields = document.querySelectorAll(string);

                            var fields_array = Array.from(fields);
                            fields_array.forEach( el => {
                                   el.value = "";
                            } );

                            fields_array[0].focus();

                     },

                     displayBudget: function(data){

                            document.querySelector('.budget__value').textContent = data.budget;
                            document.querySelector('.budget__income--value').textContent = `+${data.totals.inc}`;
                            document.querySelector('.budget__expenses--value').textContent = `-${data.totals.exp}`;

                            if(data.percentage > 0)
                            {
                                   document.querySelector('.budget__expenses--percentage').textContent = `${data.percentage}%`;
                            }
                            else
                            {
                                   document.querySelector('.budget__expenses--percentage').textContent = "---";
                            }
                            
                            

                     },

                     deleteListItem: function(selectorId)
                     {
                            var ele_delete = document.getElementById(selectorId);
                            ele_delete.parentNode.removeChild(ele_delete);
                     },

                     displayPercentage: function(percent)
                     {
                            var nodeList = document.querySelectorAll('.item__percentage');
                            var array = Array.from(nodeList);

                            var i = 0;
                            array.forEach( el => {
                                   el.textContent = percent[i] + "%";
                                   i++;
                            } );
                     },

                     displayMonth: function() 
                     {
                            //new Date(2020, 11, 20); month start from 0, so dec=11.
                            var now = new Date();
                            var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                            var year = now.getFullYear();
                            var month = months[now.getMonth()];
                            document.querySelector('.budget__title--month').textContent = month + " " + year;

                     },

                     changedType: function()
                     {
                           console.log('hi');
                            var data = document.querySelector('.add__type').value;
                            console.log(data);
                           var string = `.add__type, .add__description, .add__value`;
                           var array = Array.from(document.querySelectorAll(string));
                           
                                array.forEach(el => {
                                       el.classList.toogle('red-focus');
                                });  
                           
                     }
                     
              }

  })();

///////////////////////////////////////////////////////////////////////////////////////////////

  var controller = (function(budgetCtrl, UICtrl){



       var updateBudget = function(){

              //1. CAL THE BUDGET
              budgetCtrl.calBudget();

              //2. RETURN THE BUDGET
              var data = budgetCtrl.getBudget();
              //console.log(data);

              //3. DISPLAY THE BUDGET ON THE UI
              UICtrl.displayBudget(data);

       };


       var updatePercentages = function()
       {
              //1. Calculate the percentage
              budgetCtrl.calculatePercentages();
              
              //2. READ PERCENTAGE FROM THE DATABASE
              var percent = budgetCtrl.getPercentages();

              //3. UPDATE THE UI WITH PERCENTAGE
              UICtrl.displayPercentage(percent);
       }

       var ctrlAddItem = function(){

              // 1. GET THE INPUT DATA.
              var input = UICtrl.getInput();

              if(input.description === "" || isNaN(input.value) == true || input.value <= 0)
              {
                     UICtrl.clearFields(); 
              }
              else
              {
                     //2. ADD THE ITEM TO THE DATABASE
                     var newItem = budgetCtrl.addItem(input.type, input.desc, input.value);


                     //3. ADD THE ITEM TO THE UIController
                     UICtrl.addListItem(newItem, input.type);
                     
                     //4. CLEAR THE FIELDS
                     UICtrl.clearFields();

                     //5. WORK ON THE BUDGET IN DATABASE
                     updateBudget();

                     //6. UPDATE PERCENTAGE
                     updatePercentages();
              }

       };

       var ctrlDeleteItem = function(event){

              var item = event.target.parentNode.parentNode.parentNode.parentNode.id
              if(item)
              {
                     var array = item.split("-");
                     var type = array[0];
                     var id = parseInt(array[1]);

                     //1. DELETE THE ITEM FROM DATABASE
                     budgetCtrl.deleteItem(type, id);

                     //2. DELETE ITEM FROM UI
                     UICtrl.deleteListItem(item);

                     //3. UPDATE AND SHOW THE UPDATED DATA.
                     updateBudget();

                     //4. UPDATE PERCENTAGE
                     updatePercentages();
                     
              }

       }



       //ON MOUSE CLICK EVENT.
       document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

       //ON KEYBOARD PRESS EVENT.
       document.addEventListener('keypress', function(event){

              if(event.keyCode === 13)
              {
                    ctrlAddItem(); 
              }

       //ON MOUSE CLICK ON BUTTON TO DELETE A ROW
       document.querySelector('.container').addEventListener('click', ctrlDeleteItem);

       });

       return{ 
              updateBudget: function()
              {
                     updateBudget();
              },
              displayMonth: function()
              {
                     UICtrl.displayMonth();
              }
       }


  })(budgetController, UIController);

  controller.updateBudget();
  controller.displayMonth();