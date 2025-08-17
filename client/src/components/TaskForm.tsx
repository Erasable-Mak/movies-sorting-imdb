import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createTask, updateTask } from '../store/actions';
import { RootState } from '../store';
import { AppDispatch } from '../store';
import { useParams, useNavigate } from 'react-router-dom';

const TaskSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  description: Yup.string().required('Description is required'),
});

const TaskForm = () => {
  console.log('Rendering TaskForm'); // Log to check if the component is rendered

  const dispatch = useDispatch<AppDispatch>();
  const history = useNavigate();
  const { id } = useParams<{ id: string }>();

  // Ensure tasks is always an array, even if the state is empty or undefined
  const tasks = useSelector((state: RootState) => Array.isArray(state.tasks) ? state.tasks : []);

  // Find the task if editing
  const task = tasks.find(t => t.id === Number(id));

  // Loading state if task is not found and id is present (for editing)
  if (!task && id) {
    return <div>Loading...</div>; // Or any fallback UI to indicate loading or error
  }

  const handleSubmit = (values: any) => {
    if (id) {
      dispatch(updateTask(Number(id), values)); // Update existing task
    } else {
      dispatch(createTask(values)); // Create new task
    }
    history('/tasks'); // Redirect after submit
  };

  return (
    <Formik
      initialValues={{
        title: task ? task.title : '', // Use task details if editing
        description: task ? task.description : '', // Use task details if editing
      }}
      validationSchema={TaskSchema}
      onSubmit={handleSubmit}
    >
      <Form>
        <div>
          <Field name="title" type="text" />
          <ErrorMessage name="title" component="div" />
        </div>
        <div>
          <Field name="description" type="text" />
          <ErrorMessage name="description" component="div" />
        </div>
        <button type="submit">Save Task</button>
      </Form>
    </Formik>
  );
};

export default TaskForm;

