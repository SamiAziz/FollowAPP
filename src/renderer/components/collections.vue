        <div style="background: #f3f3f3; color: #000000; border: 1px solid #c6374e;">
          <h1>Users</h1>
          <ul v-for="user in getUsers" v-bind:key="user.index">
            <li>{{ user.name }}</li>
          </ul>
        </div>
        <div style="background: #f3f3f3; color: #000000; border: 1px solid #c6374e;">
          <h1>Tasks</h1>
          <ul v-for="task in getTasks" v-bind:key="task.index">
            <li>{{ task.letter }}</li>
          </ul>
        </div>


        <ion-row v-for="i in Math.ceil(100 / 3)" :key="i.index">
      <ion-col v-for="i in (100).slice((i - 1) * 4, i * 4)">
        ion-col
      </ion-col>
    </ion-row>