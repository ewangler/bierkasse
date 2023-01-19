import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import useCart from '../contexts/useCart';
import { useCartContext } from '../contexts/CartContextProvider';


function CartArticleList() {

  const { discount } = useCartContext();
  const { total } = useCart();

  const vat = (price: number) => {
    const vatRate = 7.7
    return price - price / (vatRate / 100 + 1)
  }

  const priceWithDiscount = total.totalPrice - (total.totalPrice * ((discount || 100) / 100))

  function createData(
    name: string,
    value: string | undefined | number,
    sign: string,
    variant: "body" | "footer" | "head" | undefined,
  ) {
    return { name, value, sign, variant };
  }

  const rows = [
    createData(total.articleQuantity.toString(), `Total ${total.totalPrice.toFixed(2)}`, 'CHF', 'head'),
    createData('Zwischentotal inkl. MWSt', total.totalPrice.toFixed(2), 'CHF', 'body'),
    createData('MWST', vat(total.totalPrice).toFixed(2), 'CHF', 'body'),
    createData('Total', total.totalPrice.toFixed(2), 'CHF', 'body'),
    createData('Rabatt', discount, '%', 'body'),
    createData('Total mit Rabatt', priceWithDiscount.toFixed(2), 'CHF', 'head'),
  ]
  const filteredRows = rows.filter((a: any) => {
    return a.value !== undefined && a.value !== '0.00'
  })

  return <TableContainer>
    <Table aria-label="simple table">
      <TableBody>
        {filteredRows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 }, '&:first-of-type th': { 'fontSize': '1.5rem', color: '#1976d2'} }}
          >
            <TableCell component="th" scope="row" variant={row.variant}>
              {row.name}
            </TableCell>
            <TableCell align="right" variant={row.variant}>{row.value} {row.sign}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
}
export default CartArticleList
