<?php
namespace App\Http\Controllers;
use App\Models\Akun;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;


class AuthController extends Controller {

    public function tampil(){
        return view('auth.Halamanlogin');
    }

    public function customLogin(Request $request){
        $credentials = $request->only('name','password');
        if(Auth::attempt($credentials)){
            return redirect()->intended('Halamandashboard')->withSuccess('Halamanlogin');
        }else{
            return view ('auth.Halamanlogin');
        }
    }

    public function registration(){
        return view('auth.registration');
    }

    public function customRegistration(Request $request) {
        $data = $request->all();
        $this->create($data);
        return redirect('Halamanlogin');
        // print_r($data);
    }

    public function create(array $data){
        return Akun::create([
           'name' => $data['name'],
           'password' => Hash::make($data['password']),
           'role' => $data['role']
        ]);
    }

    public function tampilDashboard(){
        if(Auth::check()){
            return view ('Halamandashboard');
        }
        return redirect('Halamanlogin')->withSuccess('Anda Tidak Punya Akses');
    }

    public function logout(){
        // Sess::flush();
        Auth::logout();
        return redirect('Halamanlogin');
    }
}
?>