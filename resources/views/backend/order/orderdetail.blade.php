@extends('backendtemplate')

@section('content')
	<div class="container-fluid">
    <!-- Page Heading -->
  	<div class="row">
  		<div class="col-md-6 mb-3">
    		<h1 class="h3 mb-0 text-gray-800 d-inline-block">Order Detail</h1>
    		
  		</div>

         <div class="col-md-4 offset-1">
            <div class="card shadow">
                <div class="card-body">
                    <table class="table table-bordered">
                        <tr>
                            <td>Voucher No.</td>
                            <td>{{$order->voucherno}}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>{{$order->user->name}}</td>
                        </tr>
                        <tr>
                            <td>Total Price</td>
                            <td>{{$order->total}}</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
  	</div>

   
    
    <div class="row mt-4">
    	<div class="col-md-12">
    		<table class="table table-bordered">
    			<thead class="thead-dark">
    				<tr>
    					<th>No</th>
    					<th>Photo</th>
                        <th>Item Name</th>
                        <th>Brand</th>
    					<th>Category -> <h6 class="d-inline-block"> Subcategory </h6></th>
                        <th>Qty</th>
    					<!-- <th>Actions</th> -->
    				</tr>
    			</thead>
    			<tbody>
                    @php $i=1; @endphp
    				@foreach($order->items as $order_detail)
                        <tr>
                           <td>{{$i++}}</td>
                           <td><img src="{{asset($order_detail->photo)}}" width="120px" height="100px"></td>
                           <td>{{$order_detail->name}}</td>
                           <td>{{$order_detail->brand->name}}</td>
                           
                           <td>{{$order_detail->subcategory->category->name}} -> <h6 class="d-inline-block text-gray"> {{$order_detail->subcategory->name}}
                           </h6></td>
                           <td>{{$order_detail->pivot->qty}}</td>
                       <!-- <td><</td> -->

                       </tr>
                    @endforeach
    			</tbody>
    		</table>
    	</div>
    </div>

 	</div>
@endsection