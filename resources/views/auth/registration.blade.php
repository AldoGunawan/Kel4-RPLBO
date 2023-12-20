<form method="POST" action="{{route('custom.registration')}}">
    @csrf
    Name <input type="text" name="name"><br>
    Password <input type="password" name="password">
    Role <input type="text" name="role"><br>
    <button type="submit">Login</button>
</form>