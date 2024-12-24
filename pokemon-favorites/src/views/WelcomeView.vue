<template>
  <div class="welcome">
    <div class="welcome-content">
      <img src="@/assets/welcome-image.png" alt="Welcome Pikachu" class="welcome-image" />
      <div class="welcome-text">
        <h2 class="welcome-title">Welcome to Pokédex</h2>
        <p class="welcome-description">
          The digital encyclopedia created by Professor Oak is an invaluable tool to Trainers in the Pokémon world.
        </p>
      </div>
      <RouterLink class="btn btn-primary" to="/loading">Get started</RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.welcome {
  &-content {
    text-align: center;
    max-width: 600px;
    width: 100%;
    padding: 20px;
    border-radius: 10px;
  }

  &-image {
    margin-bottom: 4rem;
  }

  &-description {
    font-size: var(--font-size-lg);
    line-height: 27px;
  }

  &-text {
    margin-bottom: 3rem;
  }

  &-title {
    margin-bottom: 1.5rem;
  }
}
</style>