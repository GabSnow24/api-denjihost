
    env = [{ key="API_PORT", value="8080" },{ key="DATABASE_URL", value="postgresql://3xa:12345@34.125.137.241:5438/3xa" } ]
    project-image="qzzdocker24/3xa"
    cloudrun_name="nodeserver" 
    port=8080
    allow_public_access=true
    max_instances=2
    min_instances=1