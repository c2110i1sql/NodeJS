CREATE TABLE favorites
(
    id bigint primary key AUTO_INCREMENT,
    product_id int unsigned NOT NULL,
    user_id bigint unsigned,
    FOREIGN KEY (product_id) REFERENCES  products (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
)