<template>
<div class="" >
    <div class="flex-container">
      <div class="rover-overview-panel">
          <h3>Latest data overview</h3>
          Date : 
          Easting : 
          Northing :
          Elevation : 
          Battery voltage :
          <h3>Total travaled distance</h3>
          Easting distance :
          Northing distance : 
          Elevation distance : 
          3D distance : 
      </div>
      <div class="rover-inclination-panel">
        Inclination
        #TODO
      </div>
      <div class="rover-map-panel">
        MAP
      </div>
    </div>
    <div>
      <h2>Plot settings</h2>
      <div class="flex-container settings">
        <div class="flex-container">
          <div class="setting-date">
            <label for="start_date">Start date</label>
            <input type="date" id="start_date" name="start_date">
          </div>
          <div class="setting-date">
            <label for="end_date">End date</label>
            <input type="date" id="end_date" name="end_date">
          </div>
        </div>
        <div class="flex-container setting-filter">
          <input type="checkbox" name="enable-low-pass" id="enable-low-pass">
          <label for="enable-low-pass">Enable low-pass filtering</label>
          <input type="range" name="low-pass" id="low-pass">
        </div>
        <div class="flex-container setting-filter">
          <input type="checkbox" name="enable-outlier" id="enable-outlier">
          <label for="enable-outlier">Enable outlier filtering</label>
          <input type="range" name="outlier" id="outlier">
        </div>
        
        
      </div>
      <div class="flex-container">
          <button class="setting-btn">Apply and plot</button>
          <button class="setting-btn">Download raw data as CSV</button>
          <button class="setting-btn">Download filtered data as CSV</button>
      </div>
      
      
    </div>
    <div>
      Plots
      <div>
        <div>
          Plot 1
        </div>
        <div>
          Plot 1
        </div>
        <div>
          Plot 1
        </div>
        <div>
          Plot 1
        </div>
        <div>
          Plot 1
        </div>
        <div>
          Plot 1
        </div>
      </div>
    </div>
</div>
</template>

<script>

export default {
  name: 'rover-overview'
}
</script>