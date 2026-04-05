import { useState } from 'react';

function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert('submited with email ' + email + 'and password: ' + password);

    setEmail('');
    setPassword('');
  }

  return (
    <div style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h1>Sign Up</h1>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label>
            Email
            <input
              type="email"
              placeholder="you@gmail.com"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </label>
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>
            Password
            <input
              type="password"
              placeholder="**********"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </label>
        </div>

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}

export default SignUpForm;
