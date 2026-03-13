import Controls from './Controls';
import sampleUsers from './sampleUsers';
import UserList from './UserList';
import {useState} from 'react';
import {useEffect} from 'react';


function UserDirectoryPage() {
  const [users, setUsers] = useState([]);
  const [sortBy, setSortBy] = useState("id");
  const [viewMode, SetViewMode] = useState("grid");

  function fetchData(){
  fetch('https://69a1dfc02e82ee536fa26faf.mockapi.io/users_id')
  .then((response)=> response.json())
  .then((data)=>{
    setUsers(data);
  });
  };

  useEffect( ()=>{
      fetchData();
  }, []);
  // TODO: add users, sortBy, and viewMode state in this component.
  // TODO: fetch the initial users with useEffect.

  async function handleDeleteClick(userId) {
    try{ 
        let data = await fetch(`https://69a1dfc02e82ee536fa26faf.mockapi.io/users_id/${userId}`, {method: 'DELETE'});
        fetchData()
      }
    catch(error) {

    }
  }

  function handleSortByGroupClick() {
        setSortBy("group");
        let sortedArray = users;
        sortedArray.sort(function(a,b){
        return Number(a.user_group) - Number(b.user_group);
    })
    setUsers(sortedArray);
  }

  function handleSortByIdClick() {

      setSortBy("id");
        let sortedArray = users;
        sortedArray.sort(function(a,b){
        return Number(a.id) - Number(b.id);
    })
      setUsers(sortedArray);
      
  }

  function handleViewToggleClick() {
    console.log(viewMode)
    SetViewMode(viewMode === "grid" ? "list" : "grid")
    console.log(viewMode)
  }

  return (
    <>
      <section className="panel">
        <h1>User Directory</h1>
      </section>

      <section className="panel">
        <h2>Controls</h2>
        <Controls onDeleteClick={handleDeleteClick} onSortByGroupClick={handleSortByGroupClick} onSortByIdClick={handleSortByIdClick} onViewToggleClick={handleViewToggleClick}/>
      </section>

      <section className="panel">
        <h2>All Users</h2>
        <UserList users={users} viewMode={viewMode} />
      </section>
    </>
  );
}

export default UserDirectoryPage;
