<script>
  import { goto } from "@sapper/app";
  let error_boolean = false;

  async function handleSubmit(event) {
    let user = {
      firstName: event.target.firstName.value,
      lastName: event.target.lastName.value,
      email: event.target.email.value,
      password: event.target.password.value
    };

    fetch("controllers/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ user })
    }).then(res => {
      goto("login");
      if (!res.ok) {
        throw new Error("Network response was not ok");
      }
    });
  }

  function validateMessageEmail(event) {
    let textbox = event.target;
    error_boolean = false;
    if (textbox.value === "") {
      textbox.setCustomValidity("Required email address");
    } else if (textbox.validity.typeMismatch) {
      error_boolean = true;
      textbox.setCustomValidity("please enter a valid email address");
    } else {
      textbox.setCustomValidity("");
    }
    return true;
  }
</script>

<form
  on:submit|preventDefault={handleSubmit}
  on:invalid={validateMessageEmail}
  on:changed={validateMessageEmail}
  on:input={validateMessageEmail}>

  <label for="firstName">First Name</label>
  <input required type="text" id="firstName" />

  <label for="lastName">Last Name</label>
  <input required type="text" id="lastName" />

  <label for="email">Email</label>
  <input required type="email" id="email" />
  {#if error_boolean}
    <h1>OH NO! AN ERRROR!</h1>
  {/if}

  <label for="password">Password</label>
  <input required type="password" id="password" />

  <button type="submit">Create account</button>
</form>
