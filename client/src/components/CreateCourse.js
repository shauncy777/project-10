import React, {Component} from 'react';
import Form from './Form';


// This component provides the "Create Course" screen by rendering a form that allows a user to create a course
class CreateCourse extends Component {
  state = {
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: '',
    errors: [],
    user: this.props.context.authenticatedUser || null,
    userId: ""
  };

  render() {
    const {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors
    } = this.state;

// Renders form with create and cancel buttons
    return (
      <div className="wrap">
        <h2>Create Course</h2>
        <Form
          cancel={this.cancel}
          errors={errors}
          submit={this.submit}
          submitButtonText="Create Course"
          elements={() => (
            <React.Fragment>
              <div className="main--flex">
                <div>
                  <label htmlFor="title">Course Title</label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    onChange={this.change}
                    value={title}
                  />

                  <label htmlFor="description">Course Description</label>
                  <textarea
                    id="description"
                    name="description"
                    type="text"
                    onChange={this.change}
                    value={description}
                  />
                </div>
                <div>
                  <label htmlFor="estimatedTime">Estimated Time</label>
                  <input
                    id="estimatedTime"
                    name="estimatedTime"
                    type="text"
                    onChange={this.change}
                    value={estimatedTime}
                  />

                  <label htmlFor="materialsNeeded">Materials Needed</label>
                  <textarea
                    id="materialsNeeded"
                    name="materialsNeeded"
                    type="text"
                    onChange={this.change}
                    value={materialsNeeded}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        />
      </div>
    );
  }

  change = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  // Ensures user is authenticated prior to submission
  submit = () => {
    const { context } = this.props;
    const { authenticatedUser } = context;
    const { title, description, estimatedTime, materialsNeeded} = this.state;
    const userId = authenticatedUser.userId;
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId
    };

    console.log(this.state.errors);
    
   
    context.data
      .createCourse(
        course,
        authenticatedUser.emailAddress,
        authenticatedUser.password
      )
      .then(errors => {
        if (errors.length) {
          this.setState({ errors });
        } else {
          console.log("Success! Course has been created.");
          this.props.history.push("/");
        }
      })
      .catch(errors => console.log(errors));
  };

  cancel = () => {
    this.props.history.push("/");
  };
}

export default CreateCourse