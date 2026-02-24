import { useState } from 'react'
import styles from './PackingList.module.css'

export default function PackingList({ items, onUpdate }) {
  const [newItem, setNewItem] = useState('')

  const add = () => {
    if (!newItem.trim()) return
    onUpdate([
      ...items,
      { id: crypto.randomUUID(), text: newItem.trim(), done: false },
    ])
    setNewItem('')
  }

  const toggle = (id) => {
    onUpdate(
      items.map((i) => (i.id === id ? { ...i, done: !i.done } : i))
    )
  }

  const remove = (id) => {
    onUpdate(items.filter((i) => i.id !== id))
  }

  return (
    <div className={styles.section}>
      <h3 className={styles.sectionTitle}>Packing list</h3>
      <div className={styles.addRow}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && add()}
          placeholder="Add an item..."
          className={styles.input}
        />
        <button type="button" className={styles.addBtn} onClick={add}>
          Add
        </button>
      </div>
      <ul className={styles.list}>
        {items.map((i) => (
          <li key={i.id} className={styles.item}>
            <label className={styles.label}>
              <input
                type="checkbox"
                checked={i.done}
                onChange={() => toggle(i.id)}
                className={styles.checkbox}
              />
              <span className={i.done ? styles.done : undefined}>
                {i.text}
              </span>
            </label>
            <button
              type="button"
              className={styles.removeBtn}
              onClick={() => remove(i.id)}
              title="Remove"
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      {items.length === 0 && (
        <p className={styles.empty}>Nothing to pack yet.</p>
      )}
    </div>
  )
}
