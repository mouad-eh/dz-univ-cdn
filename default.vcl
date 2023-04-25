vcl 4.0;

backend default {
    .host = "nginx";
    .port = "8000";
}


sub vcl_recv {
    return (hash);
}

sub vcl_backend_response {

    if (bereq.url ~ "\.(html|css|js)$") {
        set beresp.ttl = 1w;
    } else {
        set beresp.ttl = 100y;
    }


    return (deliver);
}