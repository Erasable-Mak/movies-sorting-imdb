// import { PersistGate } from 'redux-persist/integration/react';
// import { Provider } from 'react-redux';
// import store, { persistor } from './store/store';  // Import store and persistor
// import { Route, Routes } from 'react-router-dom';
// import TaskList from './components/TaskList';
// import TaskForm from './components/TaskForm';
// import LoginForm from './components/LoginForm';
// import ProtectedRoute from './components/ProtectedRoute';
// import SignupForm from './components/SignupForm';

// const App = () => {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <div>
//           <h1>Bhavna Movie Bonanza</h1>
//           <Routes>
//             <Route path="/" element={<LoginForm />} />
//             <Route path="/signup" element={<SignupForm />} />
//             <Route path="/tasks" element={<ProtectedRoute element={<TaskList />} />} />
//             <Route path="/tasks/edit/:id" element={<ProtectedRoute element={<TaskForm />} />} />
//             <Route path="/tasks/new" element={<ProtectedRoute element={<TaskForm />} />} />
//           </Routes>
//         </div>
//       </PersistGate>
//     </Provider>
//   );
// };

// export default App;





import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import store, { persistor } from './store/store';  // Import store and persistor
import { Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';  // Assuming you've updated ProtectedRoute
import SignupForm from './components/SignupForm';
import Admin from './components/Admin';
import AllMoviesToAddByUser from './components/AllMoviesToAddByUser';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div>
          <h1>Bhavna Movie Bonanza</h1>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/tasks" element={<ProtectedRoute element={<TaskList />} />} />
            <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
            <Route path="/allmoviestoaddbyuser" element={<ProtectedRoute element={<AllMoviesToAddByUser />} />} />
            <Route path="/tasks/edit/:id" element={<ProtectedRoute element={<TaskForm />} />} />
            <Route path="/tasks/new" element={<ProtectedRoute element={<TaskForm />} />} />
          </Routes>
        </div>
      </PersistGate>
    </Provider>
  );
};

export default App;



{/* <Routes>
  <Route path="/" element={<LoginForm />} />
  <Route path="/tasks" element={<ProtectedRoute element={<TaskList />} />} />
  <Route path="/tasks/edit/:id" element={<ProtectedRoute element={<TaskForm />} />} />
  <Route path="/tasks/new" element={<ProtectedRoute element={<TaskForm />} />} />
</Routes> */}
