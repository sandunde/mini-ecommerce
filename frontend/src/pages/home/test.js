<ul>
{items.map(item => (
    <li key={item._id} onClick={() => handleEdit(item._id)} style={{ cursor: 'pointer' }}>
        <img src={`http://localhost:5000${item.image}`} alt={item.name} width="50" height="50" />
        <p>SKU: {item.sku}</p>
        <p>Name: {item.name}</p>
        <p>Quantity: {item.qty}</p>
        <p>Description: {item.description}</p>
        <p>Price: ${item.price}</p>
    </li>
))}
</ul>