@extends('backendtemplate')

@section('content')
	<div class="container-fluid">
    <!-- Page Heading -->
  	<div class="row">
  		<div class="col-md-12 mb-3">
    		<h1 class="h3 mb-0 text-gray-800 d-inline-block">Subcategory List</h1>
    		<a href="{{route('subcategories.create')}}" class="btn btn-info float-right"><i class="fas fa-plus"></i>Add New</a>
  		</div>
  	</div>
    
    <div class="row">
    	<div class="col-md-12">
    		<table class="table table-bordered">
    			<thead class="thead-dark">
    				<tr>
    					<th>No</th>
    					<th>Name</th>
                        <th>Category Name</th>
    					<th>Actions</th>
    				</tr>
    			</thead>
    			<tbody>
                    @php $i=1; @endphp
                    @foreach($subcategories as $subcategory)
    				<tr>
                        <td>{{$i}}</td>    
                        <td>{{$subcategory->name}}</td>            
                        <td>{{$subcategory->category->name}}</td>            
                        <td>
                            
                            <a href="{{route('subcategories.edit',$subcategory->id)}}" class="btn btn-outline-warning"><i class="fas fa-edit"></i></a>

                            <a href="" class="btn btn-outline-danger"><i class="fas fa-trash"></i></a>
                        </td>            

                    </tr>
                    @php $i++; @endphp
                    @endforeach
    			</tbody>
    		</table>
    	</div>
    </div>

 	</div>
@endsection