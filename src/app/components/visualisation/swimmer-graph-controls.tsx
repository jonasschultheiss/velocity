export function GraphControls() {
  return (      <ComboBox
        options={Object.keys(TechniqueDictionary).map((el) => ({
          label: el,
          value: el,
          onClick: () => setTechnique(TechniqueDictionary[el] || 'F'),
        }))}
        optionType="technique"
        initialValue={Object.keys(TechniqueDictionary).find(
          (el) => TechniqueDictionary[el] === params.get('technique'),
        )}
      />
      <ComboBox
        options={Object.keys(TrackDictionary).map((el) => ({
          label: el,
          value: el,
          onClick: () => setTrack(TrackDictionary[el] || '25'),
        }))}
        optionType="track"
        initialValue={Object.keys(TrackDictionary).find((el) => TrackDictionary[el] === params.get('track'))}
      />
      <div className="flex items-center space-x-2">
        <Switch id="tooltip" checked={tooltipEnabled} onCheckedChange={() => enableTooltip(!tooltipEnabled)} />
        <Label htmlFor="tooltip">
          Enable tooltip
          <Badge className="relative z-10 ml-1 bottom-2" variant="destructive">
            Buggy
          </Badge>
        </Label>
      </div>)
}