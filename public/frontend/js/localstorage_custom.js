// file name = public/frontend/js/localstorage_custom.js


// id / name /photo 
$(document).ready(function(){
	// alert('hi');


	// to use ajax post method we need ajaxsetup and meta tag

	$.ajaxSetup({
    headers: {
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
	    }
	});


	showcart();
	cartnoti()
	$('.btn_add_to_cart').click(function(){
		// alert('hi');
		var id = $(this).data('id');
		var name = $(this).data('name');
		var photo = $(this).data('photo');
		var price = $(this).data('price');
		var discount = $(this).data('discount');
		console.log(id);
		console.log(name);
		console.log(photo);
		console.log(price);
		console.log(discount);


		var cart = localStorage.getItem('cart');
		if(!cart)
		{
			var mycart = new Array();
		}else{
			var mycart = JSON.parse(cart);
		}
			var item = {
				id:id,
				name:name,
				photo:photo,
				price:price,
				discount:discount,
				qty:1
			};

			var hasid = false;
			$.each(mycart,function(i,v){
				if(v.id == id)
				{
					hasid = true;
					v.qty++;
				}
			})
			if(!hasid){
				mycart.push(item);
			}
			localStorage.setItem('cart',JSON.stringify(mycart));
			cartnoti()
		// id / name / photo / qty

	})

	function showcart()
	{
		var mycart = localStorage.getItem('cart');
		if(mycart)
		{
			var mycartobj = JSON.parse(mycart);
			var html = '';
			var j = 1;
			var total=0;
			var subtotal=0;

			$.each(mycartobj,function(i,v){
				subtotal += v.qty*v.price;
				total+=subtotal;
				html+=`<tr>
			              <td>
			                <button class="btn btn-outline-danger remove btn-sm" style="border-radius: 50%" data-id = ${i}> 
			                  <i class="icofont-close-line"></i> 
			                </button> 
			              </td>
			              <td> 
			                <img src="${v.photo}" class="cartImg">           
			              </td>
			              <td> 
			                <p> ${v.name} </p>
			                
			              </td>
			              <td>
			                <button class="btn btn-outline-secondary plus_btn" data-id = ${i}> 
			                  <i class="icofont-plus"></i> 
			                </button>
			              </td>
			              <td>
			                <p> ${v.qty} </p>
			              </td>
			              <td>
			                <button class="btn btn-outline-secondary minus_btn" data-id = ${i}> 
			                  <i class="icofont-minus"></i>
			                </button>
			              </td>
			              <td>
			                <p class="text-danger"> 
			                  ${v.price} Ks
			                </p>
			                <p class="font-weight-lighter"> 
			                <del> ${v.discount} Ks </del> </p>
			              </td>
			              <td>
			                ${total} Ks
			              </td>
			            </tr>`;
			})
			html+= `<h3 class="text-right"> Total : ${total} Ks </h3>`
			$('#shoppingcart_table').html(html);
		}else{
			$('#shoppingcart_table').html('');

		}
	}

	// increase qty

	$('#shoppingcart_table').on('click','.plus_btn',function(){
		var id = $(this).data('id');
		// alert(id);

		var mycart = localStorage.getItem('cart');
		if(mycart)
		{
			var mycartobj = JSON.parse(mycart);
			$.each(mycartobj,function(i,v){
				if(i == id){
					v.qty++;
				}
			})
			localStorage.setItem('cart', JSON.stringify(mycartobj));
			showcart();
			cartnoti()
		}
	})

	// decrease qty

	$('#shoppingcart_table').on('click','.minus_btn',function(){
		var id = $(this).data('id');
		// alert(id);

		var mycart = localStorage.getItem('cart');
		if(mycart)
		{
			var mycartobj = JSON.parse(mycart);
			$.each(mycartobj,function(i,v){
				if(i == id){
					v.qty--;
					if(v.qty == 0)
					{
						var ans = confirm("Are you suer remove this item?");
						if(ans)
						{
							mycartobj.splice(id,1);
						}else{
							v.qty=1;
						}
					}
				}
			})
			localStorage.setItem('cart', JSON.stringify(mycartobj));
			showcart();
			cartnoti()
		}
	})

	$('#shoppingcart_table').on('click','.remove',function(){
		var id = $(this).data('id');
		var mycart = localStorage.getItem('cart');
		if(mycart)
		{
			var mycartobj = JSON.parse(mycart);
			$.each(mycartobj,function(i,v){
				if(i == id)
				{
					var ans = confirm("Are you suer remove this item?");
					if(ans)
					{
						mycartobj.splice(id,1);
					}
				}
			})
			localStorage.setItem('cart', JSON.stringify(mycartobj));
			showcart();
			cartnoti()

		}

	})


	function cartnoti()
	{
		var mycart = localStorage.getItem('cart');
		if(mycart){
			var mycartobj = JSON.parse(mycart);
			var cart = 0;
			var total=0;
			$.each(mycartobj,function(i,v){
				cart += v.qty;
				var price = parseInt(v.price);
				total+=price;
			});
			var totalprice = total+' ks';
			$('.cartNoti').html(cart);
			$('.price').html(totalprice);
		}else{
			var totalprice = 0 + " ks"
			$('.cartNoti').html(0);
			$('.price').html(totalprice);
		}

	}


	$('.buy_now').click(function(){
		var note = $('.note').val();
		var mycart = localStorage.getItem('cart');
		if(mycart){
			$.post('/orders',{mycart:mycart,note:note},function(res){
				alert(res);
				localStorage.clear();
				showcart();


			})
		}
	})








})