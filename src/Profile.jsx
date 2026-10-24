

function Profile() {
    return(
        <div id="MainProfile" className="bg-yellow-400 h-screen w-full p-40 grid md:grid-cols-4 gap-4">
  <div className="bg-red-500 p-4 text-white md:col-span-1 rounded-md">Item 1</div>
  <div className="bg-green-500 p-4 text-white md:col-span-3 rounded-md">Item 3</div>
  <div className="bg-slate-500 p-4 text-white md:col-span-2 rounded-md">Item 2</div>
  <div className="bg-pink-500 p-4 text-white md:col-span-2 rounded-md">Item 4</div>
        </div>
    );
}

export default Profile;