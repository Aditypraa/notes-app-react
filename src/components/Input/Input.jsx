function Input({ name, type, value, onChange, ...rest }) {
  // Fungsi untuk menangani perubahan input
  const handleChange = (event) => {
    const newValue = event.target.value;

    // Jika input adalah judul, batasi maksimal 50 karakter
    if (name === "title") {
      // Hanya update jika masih dalam batas atau tidak melebihi batas
      if (newValue.length <= 50) {
        onChange(newValue);
      }
      // Jika melebihi 50 karakter, tidak update state (tetap pakai nilai lama)
    } else {
      // Untuk input selain judul, tidak ada batasan
      onChange(newValue);
    }
  };

  // Properti yang sama untuk semua input
  const inputProps = {
    value,
    spellCheck: false,
    onChange: handleChange,
    ...rest,
  };

  // Return textarea untuk type="textarea", input untuk lainnya
  if (type === "textarea") {
    return <textarea className="note-input__body" {...inputProps} />;
  }

  return <input className="note-input__title" {...inputProps} />;
}
export default Input;
