Tôi đã cố gắng tìm cách đơn giản nhất để có thể lấy được API của Instagram nhầm phục vụ việc lấy image trong các bài post, nhưng dường như việc này chỉ có thể thực hiện được khi sử dụng tài khoản developer của meta, việc này khá là phức tạp.

Hmm... thôi thì mình lấy luôn từng link image lun zzz, để đa dạng về image và nhàn nhất có thể tôi đã kết hợp với thư viện `pyautogui` của `python` để hỗ trợ việc này.

Kết quả là ra được file `img.txt` mà không cần copy link của từng ảnh (vì làm tự động, bạn đọc tham khảo code trong file `get_image.py`).

Ý tưởng cơ bản của code là tự động làm việc thay cho mình, từ việc copy link, paste vào file `image.txt`, tự động scroll xuống để lấy link mới, di chuột lun các thứ... Quèo việc này tự động được hết khi bạn dùng `pyautogui` và mò để tìm ra các thao tác bạn muốn nó làm theo mục đích của bạn (các thao tác có tính quy luật).
