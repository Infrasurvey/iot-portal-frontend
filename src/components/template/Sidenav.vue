<template>
    <nav class="sidenav-install">
        <ul class="sidenav-install-ul">
            <li>
                <input type="checkbox" id="btn"/>
                <label for="btn" class="show">
                <div class="nav-group">Installation<span class="sub-arrow1"> </span></div> 
                <ul>
                    <li><router-link class="basic-link" :to="{ name: 'Overview', query: { id: this.stationid } }">Overview</router-link> </li>
                    <li><router-link class="basic-link" :to="{ name: 'Manage', query: { id: this.stationid } }">Manage</router-link></li>
                    <li><router-link class="basic-link" :to="{ name: 'Event', query: { id: this.stationid } }">Event log</router-link></li>
                </ul>
                </label>
            </li>
            <li>
                <input type="checkbox" id="btn1"/>
                <label for="btn1" class="show">
                <div class="nav-group">Base station<span class="sub-arrow2"> </span></div>
                <ul>
                    <li><router-link class="basic-link" :to="{ name: 'OverviewStation', query: { id: this.stationid } }">Overview</router-link></li>
                    <li><router-link class="basic-link" :to="{ name: 'ConfigurationStation', query: { id: this.stationid } }">Configuration</router-link></li>
                </ul>
                </label>
            </li>
            <li>
                <input type="checkbox" id="btn2"/>
                <label for="btn2" class="show">
                <div class="nav-group">Rovers<span class="sub-arrow3"> </span></div>
                <ul>
                    <li>Rover 1</li>
                    <li>Rover 2</li>
                </ul>
                </label>
            </li>
        </ul>
    </nav>
</template>

<script>

export default {
    name: 'sidenav',
    props:{
      stationid: {
          type: String,
          required : true
      }
    }
}
</script>