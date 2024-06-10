<svelte:head>
	<title>Login</title>
	<meta name="description" content="Login form" />
</svelte:head>

<div class="text-column">
	<h1>Login</h1>

	<form method="POST">
		<label for="username"></label>
		<input type="text" id="username" name="username" placeholder="Username" />
		<label for="password"></label>
		<input type="password" id="password" name="password" placeholder="Password" />
		<button type="submit">Login</button>
	</form>
</div>
