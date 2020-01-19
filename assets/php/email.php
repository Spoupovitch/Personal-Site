<?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        
        //get fields, clean strings
        $name = strip_tags(trim($_POST["name"]));
        $name = str_replace(array('\r','\n'), array('',''), $name);

        $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);

        $subject = trim($_POST["subject"]);

        $message = trim($_POST["message"]);

        //ensure data sent to mailer
		/*
        if (empty($name)
        OR !filter_var($email, FILTER_VALIDATE_EMAIL)
        OR empty($message)) {
            //send 400 (bad request) response
            http_response_code(400);
            echo 'Sorry, there was a problem with your submission.'
                + '  Please try again.';
            exit;
        }
		*/
        /*
        set receipt address here
        */
        $receiver = "spoupovitch@gmail.com";

        //build email
        $email_content = "Name: $name\n" . "Message: $message";

        $headers = "From: $name <$email>";
        $headers .= "Content-Type: text/plain; charset=utf-8";

        //send email
        if (mail($receiver, $subject, $email_content, $headers, 'spoupovitch@gmail.com')) {
            //send 200 (success) response
            http_response_code(200);
            echo 'Message sent, thank you!';
        }
        else {
            //send 500 (internal server error) response
            http_response_code(500);
            echo 'Internal error, your message could not be sent.';
        }
    }
    else {
        //not POST, send 403 (forbidden) response
        http_response_code(403);
        echo 'An error occured during submission, message not sent.';
    }
?>