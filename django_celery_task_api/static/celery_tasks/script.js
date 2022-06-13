function _checkTaskStatus(options) {
    let userOptions = options;
    options = {
        taskId: null,
        success: function(taskId, data) { console.log("No success callback defined"); },
        failed: function(taskId, status, error) { console.log("No failure callback defined"); },
        interval: 1000,
        counter: 0,
        maxAttempts: 5,
        url: "/api/tasks/{task_id}",
        ...userOptions
    };

    if ( options.counter >= options.maxAttempts ) {
        console.log("Max retries met");
        options.failed( options.taskId, "maxRetriesMet", null );
    }

    options.counter += 1;

    $.ajax({
        url: options.url.replace("{task_id}", options.taskId),
    })
    .done(function( data, textStatus, jqXHR ){
        if ( ! data.isCompleted ) {
            console.log("Task is not complete: " + options.taskId);
            setTimeout(
                function() { _checkTaskStatus(options) },
                options.interval
            );
            return;
        }
        console.log("Task is complete: " + options.taskId);
        options.success( options.taskId, data );
    })
    .fail(function( jqXHR, textStatus, errorThrown ){
        console.log("Task status check failed: " + textStatus);
       options.failed( options.taskId, textStatus, errorThrown );
    })
    .always(function(){
        console.log("Checked task status for " + options.taskId + " (" + options.counter +")");
    });
}

function checkTaskStatus(options) {
    _checkTaskStatus(options);
}
