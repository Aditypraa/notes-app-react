// Komponen Input yang menerima beberapa properti melalui destructuring.
const Input = ({ name, type, value, onChange, ...rest }) => {
  // Fungsi untuk menangani perubahan input
  const changeHandler = (event) => {
    const currentText = event.target.value;

    // Terapkan panjang teks maksimum 50 karakter jika nama input adalah "title"
    if (name === "title") {
      onChange((oldText) => (currentText.length <= 50 ? currentText : oldText));
    } else {
      onChange(currentText);
    }
  };

  // Properti umum untuk elemen input atau textarea
  const commonProps = {
    value,
    spellCheck: false,
    onChange: changeHandler,
    ...rest,
  };

  // Mengembalikan elemen yang sesuai berdasarkan tipe input
  return type === "textarea" ? (
    <textarea className="note-input__body" {...commonProps} />
  ) : (
    <input className="note-input__title" {...commonProps} />
  );
};

// Ekspor komponen Input untuk digunakan di file lain
export default Input;
