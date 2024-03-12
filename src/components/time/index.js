const {useState, useEffect} = require('react');
export default function Time({ value="12:00", onChange }) {
    const [time, setTime] = useState(value);
    const [hours, minutes] = time.split(':');
    const [selectedHours, setSelectedHours] = useState(hours);
    const [selectedMinutes, setSelectedMinutes] = useState(minutes);

    useEffect(() => {
        const time = `${selectedHours}:${selectedMinutes}`;
        setTime(time);
        onChange(time);
    }
    , [hours, minutes, selectedHours, selectedMinutes]);
  return (
    <div className='p-2 w-full h-full bg-white rounded-lg shadow-xl text-sm text-gray-700 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-pink-700 dark:border-pink-600 dark:placeholder-pink-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
      <div className='flex h-full justify-center flex-row'>
        <select
          name='hours'
          className='bg-transparent text-xl appearance-none outline-none'
          value3={selectedHours}
          onChange={(e) => setSelectedHours(e.target.value)}
        >
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
          <option value='11'>11</option>
          <option value='12'>12</option>
          <option value='13'>13</option>
          <option value='14'>14</option>
          <option value='15'>15</option>
          <option value='16'>16</option>
          <option value='17'>17</option>
          <option value='18'>18</option>
          <option value='19'>19</option>
          <option value='20'>20</option>
          <option value='21'>21</option>
        </select>
        <span className='text-xl mr-3'>:</span>
        <select
          name='minutes'
          className='bg-transparent text-xl appearance-none outline-none mr-4'
          value={selectedMinutes}
          onChange={(e) => setSelectedMinutes(e.target.value)}
        >
          <option value='0'>00</option>
          <option value='15'>15</option>
          <option value='30'>30</option>
          <option value='45'>45</option>
        </select>
        
      </div>
    </div>
  );
}
