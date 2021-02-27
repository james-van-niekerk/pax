<script>
  import { onMount, tick, beforeUpdate } from "svelte";

  let canvas;
  let ctx;
  let width = 1007;
  let height = 1140;
  const render = async () => {
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    await tick();
    ctx.clearRect(0, 0, width, height);
    draw_ball(ctx);
    draw_paddle(ctx);
  };

  let x_pos = 100;
  let x_speed = 10;
  const draw_ball = (_ctx) => {
    //   alert('draw')
    if (x_pos >= width - 50) {
      x_speed = x_speed * -1;
    }
    if (x_pos <= 0) {
      x_speed = x_speed * -1;
    }
    x_pos = x_pos + x_speed;

    // alert("draw");

    _ctx.beginPath();
    _ctx.moveTo(x_pos - 50, height / 2);
    _ctx.arc(x_pos, height / 2, 50, 0, 2 * Math.PI);
    _ctx.fill();
    _ctx.stroke();
  };

  function draw_paddle(_ctx) {
    // _ctx.beginPath();
    // _ctx.moveTo(100,100);
    // _ctx.lineWidth = 10
    _ctx.fillRect(80, 80, 20, 400);
  }
  let paused = true;

  onMount(() => {
    let raf;
    // alert("game start");
    const game_loop = () => {
      raf = requestAnimationFrame(game_loop);
      // if (!paused) {
      render();
      // player.update($keystate, $ball);
      // robot.update($ball);
      // ball.update($player, $robot);
      // }else {
      // 	alert('paused')
      // }
    };
    game_loop();
    return () => cancelAnimationFrame(raf);
  });

  //   onMount(async () => {
  // 	  await render();
  //   });

  //   beforeUpdate(async () => {
  // 	  await render();
  //   })
</script>

<div class="container" bind:clientWidth={width} bind:clientHeight={height}>
  <canvas bind:this={canvas} {width} {height} />
</div>

<style>
	* {
  padding: 0;
  margin: 0;
}

  .container {
    width: 100%;
    height: 100%;
  }
</style>
